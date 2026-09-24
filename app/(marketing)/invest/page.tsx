import type { Metadata } from 'next';
import Link from 'next/link';
import { MEDIA } from '@/content/media';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FunctionRow, ModuleSection, ProductCTA, ProductHero } from '@/components/product/ProductPage';
import { CapitalOverview } from '@/components/finance/CapitalOverview';
import { MarketChart } from '@/components/finance/MarketChart';
import { PositionsPanel } from '@/components/alpha/AlphaPanels';
import { AlphaLoop } from '@/components/alpha/AlphaLoop';
import { Card, CardHeader } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { getCapital, getPositions, referenceSeries } from '@/lib/bankData';
import styles from './invest.module.css';

export const metadata: Metadata = {
  title: 'Invest — Bank',
  description: 'Autonomous intelligence. Real opportunities.',
};

/**
 * Invest is the parent investing section.
 *
 * Alpha is visually prominent but clearly NESTED inside Bank: it appears as a
 * module here and owns its own route at /invest/alpha. It is never presented
 * as a separate brand.
 */
export default async function InvestPage() {
  const [capital, positions] = await Promise.all([getCapital('invest'), getPositions()]);

  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <ProductHero
          headline={
            <>
              Smarter
              <br />
              investing.
              <br />
              With Alpha.
            </>
          }
          copy="Autonomous intelligence. Real opportunities."
          primaryCta={{ label: 'Get Started', href: '/invest/alpha' }}
          secondaryCta={{ label: 'Learn More', href: '/resources' }}
          capital={capital.data}
          media={MEDIA.invest}
          phoneLabel="Portfolio value"
          seed={53}
        />

        <FunctionRow
          functions={[
            { icon: 'allocate', label: 'Portfolio' },
            { icon: 'analyze', label: 'Markets' },
            { icon: 'manage', label: 'Positions' },
            { icon: 'intelligence', label: 'Performance' },
            { icon: 'observe', label: 'Watchlist' },
          ]}
        />

        <ModuleSection title="Your portfolio." columns={2}>
          <div id="portfolio">
            <CapitalOverview capital={capital.data} title="Portfolio" />
          </div>

          <Card>
            <CardHeader title="Performance" />
            <MarketChart
              series={referenceSeries(67, 60, 0.003)}
              comparison={referenceSeries(89, 60, 0.0015)}
              label="Portfolio performance against its benchmark"
            />
            <p className={styles.chartKey}>
              <span className={styles.keyPrimary} aria-hidden="true" /> Portfolio
              <span className={styles.keyCompare} aria-hidden="true" /> Benchmark
            </p>
          </Card>

          <div id="markets">
            <PositionsPanel positions={positions.data} />
          </div>

          {/* Alpha: prominent, but a module inside Bank. */}
          <Card>
            <CardHeader title="Alpha" />
            <p className={styles.alphaExpansion}>Autonomous Learning &amp; Portfolio Handling Architecture</p>
            <p className={styles.alphaCopy}>
              Alpha is an autonomous portfolio intelligence system built into Bank. It analyzes
              markets, manages risk, and allocates capital continuously.
            </p>
            <div className={styles.alphaLoop}>
              <AlphaLoop compact />
            </div>
            <Link href="/invest/alpha" className={`textLink ${styles.alphaLink}`}>
              Open Alpha
              <Icon name="arrowRight" size={15} />
            </Link>
          </Card>
        </ModuleSection>

        <ProductCTA
          headline="Let Alpha work for you."
          copy="Autonomous portfolio intelligence, with risk controls that stay independent."
          cta={{ label: 'Open Alpha', href: '/invest/alpha' }}
        />
      </main>
      <Footer />
    </>
  );
}
