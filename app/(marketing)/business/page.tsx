import type { Metadata } from 'next';
import { MEDIA } from '@/content/media';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FunctionRow, ModuleSection, ProductCTA, ProductHero } from '@/components/product/ProductPage';
import { CapitalOverview } from '@/components/finance/CapitalOverview';
import { AccountList } from '@/components/finance/AccountList';
import { MarketChart } from '@/components/finance/MarketChart';
import { Card, CardHeader } from '@/components/ui/Card';
import { Metric } from '@/components/ui/Metric';
import { getAccounts, getCapital, referenceSeries } from '@/lib/bankData';
import { usd } from '@/lib/domain';
import styles from './business.module.css';

export const metadata: Metadata = {
  title: 'Business — Bank',
  description:
    'Bank Business gives you the financial infrastructure to operate, scale, and move capital globally.',
};

const INSIGHTS = [
  { title: 'Payroll is funded through next cycle.', detail: 'Reserved balance covers the next two runs.' },
  { title: 'International exposure is 20% of capital.', detail: 'Held across multi-currency balances.' },
  { title: 'Tax reserve is on track.', detail: 'Set aside automatically each settlement.' },
];

/**
 * Business reads more operational than Personal, as the spec asks: the
 * cash-flow and capital-management modules carry the page rather than the
 * lifestyle framing used on Personal and Family.
 */
export default async function BusinessPage() {
  const [capital, accounts] = await Promise.all([getCapital('business'), getAccounts('business')]);

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
              Built for
              <br />
              what&rsquo;s next.
            </>
          }
          copy="Operate. Scale. Go further."
          primaryCta={{ label: 'Get Started', href: '/signup' }}
          secondaryCta={{ label: 'Talk to Sales', href: '/company' }}
          capital={capital.data}
          heroBackground="business"
          media={MEDIA.business}
          phoneLabel="Operating capital"
          seed={23}
        />

        <FunctionRow
          functions={[
            { icon: 'manage', label: 'Business Accounts' },
            { icon: 'exchange', label: 'Payments' },
            { icon: 'family', label: 'Team Access' },
            { icon: 'intelligence', label: 'Cash Flow' },
            { icon: 'globe', label: 'Global Operations' },
          ]}
        />

        <ModuleSection title="Power your business." columns={2}>
          <CapitalOverview capital={capital.data} title="Account Overview" />

          <Card>
            <CardHeader title="Cash Flow" />
            <Metric label="Net this quarter" value={usd(36420)} changePct={4.2} />
            <div className={styles.chart}>
              <MarketChart
                series={referenceSeries(41, 40, 0.004)}
                label="Business cash flow across the last six months"
              />
            </div>
          </Card>

          <AccountList accounts={accounts.data} title="Accounts" />

          <Card>
            <CardHeader title="Business Insights" />
            <ul className={styles.insights}>
              {INSIGHTS.map((insight) => (
                <li key={insight.title}>
                  <p className={styles.insightTitle}>{insight.title}</p>
                  <p className={styles.insightDetail}>{insight.detail}</p>
                </li>
              ))}
            </ul>
          </Card>
        </ModuleSection>

        <ProductCTA
          headline="Move your business forward."
          copy="Open a business account and put your operating capital to work."
          cta={{ label: 'Get Started', href: '/signup' }}
        />
      </main>
      <Footer />
    </>
  );
}
