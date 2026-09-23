# BANK — complete web system

Implementation of the Bank developer specifications as one Next.js App Router
project: 15 routes, one design system, one data layer.

| Route | Purpose |
|---|---|
| `/` | Bank platform homepage |
| `/personal` `/business` `/family` `/travel` | Persona product pages |
| `/invest` | Parent investing section |
| `/invest/alpha` | Alpha dashboard |
| `/global-dollar` | Bank's global reference layer |
| `/ventures` | Bank Ventures, the investment arm |
| `/resources` `/company` `/pricing` | Content pages |
| `/plus` | Bank Plus, the premium plan |
| `/login` `/signup` | Authentication |

**Bank** is the platform. **Bank Plus** is the premium financial operating
system. **Alpha** is the autonomous portfolio system inside Bank — it keeps its
own name, route and identity, and is never renamed "Bank Alpha". **Global
Dollar** is the global reference layer.

## Running

```bash
npm run dev          # http://localhost:3000
npm run build && npm start
npm run audit:all    # rebuild, serve on :3210, audit every route at every QA width
```

## Architecture

Content, financial data, navigation and presentation are separate, per §12.

```
app/
  layout.tsx           metadata, viewport (zoom never capped)
  page.tsx             BankHome — composition root only
  globals.css          design tokens, container, buttons, focus, utilities
content/               copy and link structure, no presentation
lib/marketData.ts      the market-data seam
components/
  plus/                Bank Plus page: PlusHeader, PlusBadge, PlusHero,
                       BankPlusPhone, FeatureOverview, LifeModes,
                       InvestAlpha, PlusGlobalDollar, PlusTrust, PlusCTA,
                       PlusFooter
  Header/              BankLogo, DesktopNavigation, MobileNavigation
  Hero/                HeroContent, BankPhone
  CapabilityGrid/      CapabilityCard
  FinancialLife/       FinancialLifeCard
  GlobalDollar/        CurrencyTicker, GlobalDollarChart, TimeRangeSelector
  Infrastructure/      SystemStage
  TrustMetrics.tsx     metrics + Join Bank CTA
  Footer.tsx
  ui/                  Icon, Change
```

Only `GlobalDollarPanel` and `MobileNavigation` are client components — the
range selector and the menu are the only things that genuinely need the
browser. Everything else renders on the server.

## Token scoping

The two specs give the SAME token names different meanings: on the homepage
`--surface` is the page background (`#fff`), while Bank Plus uses it as a
subtle panel fill (`#f7f7f7`) with `--white` as the background. Borders differ
too (`#e2e2e2` vs `#e4e4e4`), as do the container gutters (48px vs 64px).

Rather than force one spec to drift, the Bank Plus values are scoped to a
`.theme` wrapper in `app/plus/plus.module.css`. Each page is internally
correct against its own spec, and the shared primitives (`ui/Icon`,
`ui/Change`, `lib/marketData`, the buttons and focus treatment) are reused by
both.

## Three things deliberately not hard-coded

**Market data.** `lib/marketData.ts` ships a clearly labelled reference
snapshot and nothing else. No component embeds a rate. To go live, implement
`getGlobalDollar()` against the market-data provider of record and return
`isLive: true`; the UI already handles both states and prints provenance while
the feed is not live. The spec is explicit that these values must not be
presented as live financial data.

**Trust metrics.** Every figure in `content/metrics.ts` and
`content/plus/metrics.ts` carries a `verified` flag, all currently `false`.
The Bank Plus spec requires these be config-driven rather than hard-coded, and
they are. While any figure is unverified the section renders
"Figures shown are illustrative and pending verification." Substantiate the
numbers, set the flags, and the qualifier disappears on its own. Publishing
"500K+ Users" as unqualified fact is a legal exposure, not a design detail.

**The Ventures portfolio.** `content/ventures.ts` exports `PORTFOLIO` as an
empty array and `/ventures` renders "Portfolio coming soon" for exactly as
long as it stays that way. The brief is explicit that fictional companies
must not be shown, so the grid is built and typed but has nothing to render.
Push a real company in and the grid replaces the notice on its own. Fund
figures — size, cheque range, portfolio count — are absent rather than
placeheld, for the same reason the trust metrics carry a `verified` flag.

## Responsive behaviour

Breakpoints and container widths are exactly as specified. Type is fluid via
`clamp()` between them; the desktop page is never scaled down.

Below 768px the capability modules and the six system stages become horizontal
snap rails rather than shrinking to unreadable widths, and the currency ticker
scrolls instead of truncating figures. The footer uses the two-column link
layout the spec offers as the alternative to accordions — collapsible
`<details>` was tried and rejected because browsers hide closed content via UA
internals (Chrome now `::details-content`) that no author selector can reliably
re-open, which silently rendered the desktop columns as bare headings.

## Accessibility

Targets WCAG 2.2 AA. Semantic landmarks, a skip link, visible focus on every
control, 44×44 minimum touch targets below 768px, and `prefers-reduced-motion`
honoured.

Financial change never relies on colour: `ui/Change.tsx` renders a colour, a
visible +/− sign, and a screen-reader word ("up"/"down"). The chart is exposed
as a labelled image with a plain-language summary plus a real data table. The
phone and the card art are labelled images, so their internals stay out of the
accessibility tree instead of reading as a wall of decorative numbers.

## The audit

`npm run audit` drives system Chrome through puppeteer-core and checks, at
1920 / 1440 / 1024 / 768 / 414 / 375: no horizontal overflow, no element past
the viewport, no body text under 13px, and 44px minimum touch targets on
touch widths. It also writes full-page screenshots to `.audit/`.

Run `audit:cycle` rather than building while a server is running — on Windows
the running server holds `.next` open, and building underneath it produces
chunks it cannot serve, which yields an unstyled page and a meaningless pass.
