/**
 * Responsive acceptance audit.
 *
 * Checks the spec's section-11 rules at every acceptance width rather than
 * eyeballing them: no horizontal overflow, no body text under 13px, no
 * element wider than the viewport, and 44px minimum touch targets.
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// Passed WITHOUT a leading slash: Git Bash rewrites a value starting with
// '/' into a Windows path before node ever sees it.
const ROUTE = process.env.AUDIT_ROUTE ? '/' + process.env.AUDIT_ROUTE.replace(/^\//, '') : '/';
const URL = 'http://127.0.0.1:3210' + ROUTE;
// The Bank Plus spec names eight QA widths; the BANK homepage names six.
// Auditing the union keeps one harness honest for both.
const WIDTHS = [
  { w: 1920, h: 1200, name: 'desktop-1920' },
  { w: 1440, h: 1000, name: 'desktop-1440' },
  { w: 1280, h: 950, name: 'desktop-1280' },
  { w: 1024, h: 900, name: 'laptop-1024' },
  { w: 768, h: 1000, name: 'tablet-768' },
  { w: 414, h: 900, name: 'mobile-414' },
  { w: 390, h: 900, name: 'mobile-390' },
  { w: 375, h: 900, name: 'mobile-375' },
];
const PREFIX = ROUTE === '/' ? '' : ROUTE.replace(/\//g, '') + '-';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});

let failures = 0;
const report = [];

for (const { w, h, name } of WIDTHS) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));

  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const vw = window.innerWidth;

    // 1. Horizontal overflow of the page itself.
    const pageOverflow = doc.scrollWidth - vw;

    // 2. Any element extending past the viewport. Rails are allowed to
    //    scroll internally, so their descendants are excluded.
    const railDescendant = (el) => el.closest('.rail, [class*="rail"]') !== null;
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (railDescendant(el)) continue;
      if (r.right > vw + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && String(el.className).slice(0, 40)) || '',
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    }

    // 3. Smallest rendered font size on any element holding real text.
    let minFont = 99;
    let minFontEl = '';
    for (const el of document.querySelectorAll('body *')) {
      const text = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim())
        .join('');
      if (text.length < 4) continue;
      // Skip anything not actually rendered; a display:none element still
      // reports a computed font-size and was producing phantom failures.
      const box = el.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) continue;
      if (el.closest('.visuallyHidden') || el.matches('.visuallyHidden')) continue;
      // Content inside something exposed as an image is image detail, not
      // body copy — the product render carries a text alternative instead.
      if (el.closest('[role="img"]')) continue;
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      // The design system's own scale: labels and data are valid at 11-14px,
      // while the ~13px floor governs body copy. Short strings are treated as
      // labels/data, longer runs as body copy.
      const floor = text.length > 40 ? 13 : 11;
      if (size >= floor) continue;
      if (size < minFont) {
        minFont = size;
        minFontEl = el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 30);
      }
    }

    // 4. Interactive targets below 44x44 (touch widths only).
    const small = [];
    for (const el of document.querySelectorAll('a, button, [role="tab"]')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (el.closest('.skipLink')) continue;
      // WCAG 2.5.8 has an explicit exception for targets rendered inline
      // within a sentence — forcing a 44px box on those would break the prose.
      const inlineInText =
        getComputedStyle(el).display.startsWith('inline') &&
        el.parentElement &&
        el.parentElement.textContent.trim().length > el.textContent.trim().length;
      if (inlineInText) continue;
      if (r.height < 44 - 0.5 || r.width < 44 - 0.5) {
        small.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 24)} ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    }

    return { pageOverflow, offenders, minFont, minFontEl, small, scrollHeight: doc.scrollHeight };
  });

  await page.screenshot({ path: `.audit/${PREFIX}${name}.png`, fullPage: true });
  await page.close();

  const isTouch = w <= 767;
  const lines = [];
  const bad = (msg) => { failures++; lines.push('  FAIL  ' + msg); };
  const ok = (msg) => lines.push('  pass  ' + msg);

  result.pageOverflow > 1 ? bad(`horizontal overflow of ${result.pageOverflow}px`) : ok('no horizontal overflow');
  result.offenders.length ? bad(`${result.offenders.length} past viewport: ` + result.offenders.map(o => o.tag+"."+o.cls.split("__").pop()+" "+o.left+".."+o.right).join(" | ")) : ok('no element past the viewport');
  result.minFont < 99
    ? bad(`text below its floor: ${result.minFont}px on ${result.minFontEl}`)
    : ok('type meets the scale (body >= 13px, labels/data >= 11px)');
  if (isTouch) {
    result.small.length ? bad(`${result.small.length} target(s) under 44px: ` + result.small.join(" | ")) : ok('all touch targets >= 44px');
  }

  report.push(`${name} (${w}px)  height ${result.scrollHeight}px\n` + lines.join('\n'));
}

await browser.close();
console.log(report.join('\n\n'));
console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
