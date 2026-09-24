import type { Metadata } from 'next';
import { MEDIA } from '@/content/media';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FunctionRow, ModuleSection, ProductCTA, ProductHero } from '@/components/product/ProductPage';
import { CapitalOverview } from '@/components/finance/CapitalOverview';
import { GoalProgress } from '@/components/finance/GoalProgress';
import { AccountList } from '@/components/finance/AccountList';
import { Card, CardHeader } from '@/components/ui/Card';
import { getAccounts, getCapital, getGoals } from '@/lib/bankData';
import styles from './family.module.css';

export const metadata: Metadata = {
  title: 'Family — Bank',
  description:
    'Save. Plan. Build. For what matters.',
};

const MEMBERS = [
  { name: 'Primary', role: 'Full access' },
  { name: 'Partner', role: 'Full access' },
  { name: 'Teen', role: 'Allowance and spending only' },
];

/**
 * Family stays financial and restrained. The spec is explicit that it must not
 * read as childish, so it uses the same monochrome modules as Business rather
 * than a softer visual language.
 */
export default async function FamilyPage() {
  const [capital, goals, accounts] = await Promise.all([
    getCapital('family'),
    getGoals('family'),
    getAccounts('family'),
  ]);

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
              A stronger
              <br />
              future together.
            </>
          }
          copy="Save. Plan. Build. For what matters."
          primaryCta={{ label: 'Get Started', href: '/signup' }}
          secondaryCta={{ label: 'Learn More', href: '/resources' }}
          capital={capital.data}
          media={MEDIA.family}
          phoneLabel="Family capital"
          seed={31}
        />

        <FunctionRow
          functions={[
            { icon: 'allocate', label: 'Shared Goals' },
            { icon: 'exchange', label: 'Allowances' },
            { icon: 'protect', label: 'Permissions' },
            { icon: 'intelligence', label: 'Family Insights' },
            { icon: 'manage', label: 'Secure Access' },
          ]}
        />

        <ModuleSection title="Build together." columns={2}>
          <CapitalOverview capital={capital.data} title="Family Capital" />
          <GoalProgress goals={goals.data} title="Family Goals" />
          <AccountList accounts={accounts.data} title="Accounts" />

          <Card>
            <CardHeader title="Members and Permissions" />
            <dl className={styles.members}>
              {MEMBERS.map((member) => (
                <div key={member.name} className={styles.member}>
                  <dt className={styles.memberName}>{member.name}</dt>
                  <dd className={styles.memberRole}>{member.role}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </ModuleSection>

        <ProductCTA
          headline="More tomorrow. Together."
          copy="Open a family account and start building toward what matters."
          cta={{ label: 'Get Started', href: '/signup' }}
        />
      </main>
      <Footer />
    </>
  );
}
