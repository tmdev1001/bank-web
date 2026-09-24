import type { Metadata } from 'next';
import Link from 'next/link';
import { MEDIA } from '@/content/media';
import { HeroMedia } from '@/components/ui/HeroMedia';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AlphaLoop } from '@/components/alpha/AlphaLoop';
import { AlphaStatusPanel, DecisionFeed, PositionsPanel, RiskPanel } from '@/components/alpha/AlphaPanels';
import { CapitalOverview } from '@/components/finance/CapitalOverview';
import { MarketChart } from '@/components/finance/MarketChart';
import { Card, CardHeader } from '@/components/ui/Card';
import { Metric } from '@/components/ui/Metric';
import { Badge } from '@/components/ui/Badge';
import { getAlphaDecisions, getAlphaStatus, getCapital, getPositions, referenceSeries } from '@/lib/bankData';
import { usd } from '@/lib/domain';
import styles from './alpha.module.css';

export const metadata: Metadata = {
  title: 'Alpha — Invest — Bank',
  description:
    'Alpha is an autonomous portfolio intelligence system built into Bank: observe, analyze, decide, risk check, authorize, execute, reconcile, measure, learn.',
};

/**
 * Alpha dashboard.
 *
 * Denser and more technical than the marketing pages, as the spec allows, but
 * built from the same Bank design system — NOT a separate brand site. The
 * header and footer are the shared Bank ones, and Alpha appears as a product
 * within Invest.
 */
export default async function AlphaPage() {
  const [capital, status, positions, decisions] = await Promise.all([
    getCapital('invest'),
    getAlphaStatus(),
    getPositions(),
    getAlphaDecisions(),
  ]);

  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className={styles.heroShell} aria-labelledby="alpha-heading">
          <div className={`container ${styles.hero}`}>
          <div className={styles.heroContent}>
            <nav aria-label="Breadcrumb" className={styles.crumb}>
              <Link href="/invest">Invest</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Alpha</span>
            </nav>

            <h1 id="alpha-heading" className={styles.headline}>
              Smarter investing.
              <br />
              With Alpha.
            </h1>
            <p className={styles.expansion}>Autonomous Learning &amp; Portfolio Handling Architecture</p>
            <p className={styles.copy}>
              Alpha is an autonomous portfolio intelligence system built into Bank. It analyzes
              markets, manages risk, and allocates capital continuously.
            </p>
            <p className={styles.boundary}>
              Bank owns the financial relationship and infrastructure. Alpha operates the portfolio
              intelligence system.
            </p>

            <div className={styles.actions}>
              <Link href="/signup" className="btn btnPrimary">
                Launch Alpha
              </Link>
              <Link href="/resources" className={`btn btnSecondary ${styles.secondaryBtn}`}>
                Learn More
              </Link>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.heroMetrics}>
              <Metric label="Portfolio value" value={capital.data.total} size="lg" changePct={3.1} />
              <Badge tone={status.data.mode === 'live' ? 'dark' : 'neutral'}>
                {status.data.mode} trading
              </Badge>
            </div>
            {!capital.isLive && <p className={styles.provenance}>{capital.source}</p>}
          </div>
          </div>
        </section>

        <section className={`container ${styles.loopSection}`} aria-labelledby="loop-heading">
          <h2 id="loop-heading" className={styles.sectionHeading}>
            Alpha in action.
          </h2>
          <AlphaLoop />
          <p className={styles.loopNote}>
            Risk Check and Authorize are independent stages. Alpha cannot approve its own risk.
          </p>
        </section>

        <section className={`container ${styles.grid}`} aria-label="Alpha dashboard">
          <CapitalOverview capital={capital.data} title="Allocation" />
          <AlphaStatusPanel status={status.data} />
          <RiskPanel />
          <PositionsPanel positions={positions.data} />
          <DecisionFeed decisions={decisions.data} />

          <Card>
            <CardHeader title="Historical Intelligence" />
            <dl className={styles.histRows}>
              <div className={styles.histRow}>
                <dt>Daily return</dt>
                <dd className="tabular">+0.42%</dd>
              </div>
              <div className={styles.histRow}>
                <dt>Benchmark return</dt>
                <dd className="tabular">+0.21%</dd>
              </div>
              <div className={styles.histRow}>
                <dt>Cash reserve</dt>
                <dd className="tabular">{Math.round(status.data.reservePct * 100)}%</dd>
              </div>
              <div className={styles.histRow}>
                <dt>Invested capital</dt>
                <dd className="tabular">{Math.round(status.data.investedPct * 100)}%</dd>
              </div>
              <div className={styles.histRow}>
                <dt>Realized to date</dt>
                <dd className="tabular">{usd(0).amount === 0 ? '$0' : ''}</dd>
              </div>
            </dl>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
