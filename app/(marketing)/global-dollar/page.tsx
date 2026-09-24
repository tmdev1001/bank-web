import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CurrencyTicker } from '@/components/finance/CurrencyTicker';
import { MarketChart } from '@/components/finance/MarketChart';
import { Card, CardHeader } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { MEDIA } from '@/content/media';
import { HeroMedia } from '@/components/ui/HeroMedia';
import { getRates, referenceSeries } from '@/lib/bankData';
import { RangeChart } from './RangeChart';
import styles from './global-dollar.module.css';

export const metadata: Metadata = {
  title: 'Global Dollar — Bank',
  description: 'One reference for understanding value across currencies and global markets.',
};

const PILLARS = [
  { icon: 'observe' as const, label: 'Real-Time Rates' },
  { icon: 'globe' as const, label: 'Global Coverage' },
  { icon: 'allocate' as const, label: 'Transparent Pricing' },
  { icon: 'protect' as const, label: 'Built for the Future' },
];

/**
 * Global Dollar — Bank's global reference layer.
 *
 * Every rate comes from the data seam. The spec is explicit: "All rates must
 * be supplied from the production data layer. Do not hard-code mock financial
 * data." While the feed is not live the page says so, in text, beside the
 * figures — an unlabelled rate on a bank site reads as a quote.
 */
export default async function GlobalDollarPage() {
  const rates = await getRates();
  const series = {
    '1D': referenceSeries(7, 48),
    '1W': referenceSeries(13, 56),
    '1M': referenceSeries(29, 64),
    '3M': referenceSeries(53, 72),
    '1Y': referenceSeries(97, 88),
  };

  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className={`container ${styles.hero}`} aria-labelledby="gd-heading">
          <div className={styles.heroContent}>
            <h1 id="gd-heading" className={styles.headline}>
              One reference.
              <br />A more open world.
            </h1>
            <p className={styles.copy}>
              One global benchmark.
              <br />
              More possibilities.
            </p>
            <div className={styles.actions}>
              <Link href="/signup" className="btn btnPrimary">
                Explore Global Dollar
              </Link>
              <Link href="/resources" className="btn btnSecondary">
                Learn More
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            {/* <HeroMedia
              src={MEDIA.globalDollar.src}
              alt={MEDIA.globalDollar.alt}
              ratio="1 / 1"
              priority
              sizes="(max-width: 1023px) 100vw, 42vw"
            /> */}
          </div>
        </section>

        <section className={`container ${styles.pillars}`} aria-label="Highlights">
          <ul className={`${styles.pillarList} rail`}>
            {PILLARS.map((pillar) => (
              <li key={pillar.label} className={styles.pillar}>
                <Icon name={pillar.icon} size={22} />
                <span className={styles.pillarLabel}>{pillar.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`container ${styles.grid}`} aria-labelledby="rates-heading">
          <h2 id="rates-heading" className="visuallyHidden">
            Rates and reference chart
          </h2>

          <Card>
            <CardHeader title="Live Rates" />
            <CurrencyTicker rates={rates.data} />
            {!rates.isLive && <p className={styles.provenance}>{rates.source}</p>}
          </Card>

          <Card>
            <CardHeader title="Global Dollar Chart" />
            <p className={styles.reference}>$1.00</p>
            <p className={styles.referenceLabel}>Global Reference</p>
            <RangeChart series={series} />
          </Card>
        </section>

        <section className={`container ${styles.explain}`} aria-labelledby="method-heading">
          <h2 id="method-heading" className={styles.sectionHeading}>
            Methodology
          </h2>
          <div className={styles.explainGrid}>
            <Card>
              <CardHeader title="What it is" />
              <p className={styles.explainCopy}>
                A common reference for reading movement across currencies, so value can be compared
                on one scale rather than many.
              </p>
            </Card>
            <Card>
              <CardHeader title="How it moves" />
              <p className={styles.explainCopy}>
                The reference tracks a weighted basket. Individual currencies move against it; the
                reference itself stays the unit of comparison.
              </p>
            </Card>
            <Card>
              <CardHeader title="Where rates come from" />
              <p className={styles.explainCopy}>
                In production, rates are supplied by the market-data provider of record and carry a
                timestamp. Nothing on this page is a quote or an executable price.
              </p>
            </Card>
          </div>
        </section>

        <section className={`container ${styles.ctaWrap}`}>
          <div className={`${styles.cta} onDark`}>
            <h2 className={styles.ctaHeading}>A more open financial future.</h2>
            <Link href="/signup" className={`btn ${styles.ctaButton}`}>
              Explore Global Dollar
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
