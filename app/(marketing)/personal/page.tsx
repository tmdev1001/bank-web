import type { Metadata } from 'next';
import { MEDIA } from '@/content/media';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FunctionRow, ModuleSection, ProductCTA, ProductHero } from '@/components/product/ProductPage';
import { CapitalOverview } from '@/components/finance/CapitalOverview';
import { AccountList } from '@/components/finance/AccountList';
import { ActivityFeed } from '@/components/finance/ActivityFeed';
import { GoalProgress } from '@/components/finance/GoalProgress';
import { AllocationChart } from '@/components/finance/AllocationChart';
import { Card, CardHeader } from '@/components/ui/Card';
import { formatMoney } from '@/lib/domain';
import { getAccounts, getActivity, getCapital, getGoals, getSpending } from '@/lib/bankData';

export const metadata: Metadata = {
  title: 'Personal — Bank',
  description: 'Manage. Grow. Move forward.',
};

export default async function PersonalPage() {
  const [capital, accounts, activity, spending, goals] = await Promise.all([
    getCapital('personal'),
    getAccounts('personal'),
    getActivity(),
    getSpending(),
    getGoals('personal'),
  ]);

  return (
    <>
      <a href="#main" className="skipLink">Skip to content</a>
      <Header />
      <main id="main">
        <ProductHero
          headline={<>Your money.<br />Your way.</>}
          copy="Manage. Grow. Move forward."
          primaryCta={{ label: 'Get Started', href: '/signup' }}
          secondaryCta={{ label: 'Learn More', href: '/resources' }}
          capital={capital.data}
          heroBackground="personal"
          media={MEDIA.personal}
          phoneLabel="Total capital"
          seed={11}
        />

        <FunctionRow
          functions={[
            { icon: 'manage', label: 'Accounts' },
            { icon: 'exchange', label: 'Cards' },
            { icon: 'intelligence', label: 'Investing' },
            { icon: 'allocate', label: 'Spending' },
            { icon: 'globe', label: 'Global Access' },
          ]}
        />

        {/* Mobile priority order per spec: capital, accounts, activity,
            spending, investments, goals. Source order is that order. */}
        <ModuleSection title="Everything you need. In one place." columns={2}>
          <CapitalOverview capital={capital.data} />
          <AccountList accounts={accounts.data} />
          <ActivityFeed activity={activity.data} />
          <Card>
            <CardHeader title="Monthly Spending" />
            <AllocationChart
              slices={spending.data.categories.map((c) => ({ label: c.label, share: c.share }))}
              centreValue={formatMoney(spending.data.total)}
              centreLabel="Total"
            />
          </Card>
          <GoalProgress goals={goals.data} />
          <Card>
            <CardHeader title="Global Dollar" />
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              One reference for a world of currencies. Track value across borders from the same
              account.
            </p>
            <p style={{ marginTop: 16, fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em' }}>
              $1.00
            </p>
            <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Global Reference
            </p>
          </Card>
        </ModuleSection>

        <ProductCTA
          headline="More from your money."
          copy="Bank Plus brings capital, currencies, and intelligence into one financial operating system."
          cta={{ label: 'Get Bank Plus', href: '/plus' }}
        />
      </main>
      <Footer />
    </>
  );
}
