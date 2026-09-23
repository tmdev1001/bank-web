import type { CapitalSummary } from '@/lib/domain';
import { Card, CardHeader } from '@/components/ui/Card';
import { Metric } from '@/components/ui/Metric';
import { AllocationChart } from './AllocationChart';
import { formatMoney } from '@/lib/domain';
import styles from './finance.module.css';

/**
 * Total capital plus its split.
 *
 * The donut's shares are DERIVED from the three balances, so the ring can
 * never disagree with the figures printed beside it.
 */
export function CapitalOverview({ capital, title = 'Capital Overview' }: { capital: CapitalSummary; title?: string }) {
  // Slices of the TOTAL. Reserve is carved out of cash rather than added
  // alongside it, so the ring sums to 100% of total capital.
  const parts = [
    { label: 'Available', share: capital.cash.amount - capital.reserve.amount },
    { label: 'Reserve', share: capital.reserve.amount },
    { label: 'Invested', share: capital.invested.amount },
  ];

  return (
    <Card>
      <CardHeader title={title} />
      <Metric label="Total capital" value={capital.total} size="lg" />
      <div className={styles.capitalBody}>
        <AllocationChart
          slices={parts}
          centreValue={formatMoney(capital.total, { compact: true })}
          centreLabel="Total"
        />
      </div>
    </Card>
  );
}
