import type { Activity } from '@/lib/domain';
import { formatMoney } from '@/lib/domain';
import { Card, CardHeader } from '@/components/ui/Card';
import styles from './finance.module.css';

/**
 * Recent activity.
 *
 * Direction is carried by the sign and a screen-reader word, not by colour
 * alone — the spec's rule, and it also survives greyscale.
 */
export function ActivityFeed({ activity, title = 'Recent Activity' }: { activity: Activity[]; title?: string }) {
  return (
    <Card>
      <CardHeader title={title} />
      <dl className={styles.rows}>
        {activity.map((item) => {
          const negative = item.amount.amount < 0;
          return (
            <div key={item.id} className={styles.row}>
              <dt>
                <span className={styles.rowLabel}>{item.label}</span>
                <span className={styles.rowMeta}>{item.detail}</span>
              </dt>
              <dd className={`${styles.rowValue} tabular ${negative ? 'negative' : 'positive'}`}>
                <span className="visuallyHidden">{negative ? 'debit ' : 'credit '}</span>
                <span aria-hidden="true">{negative ? '−' : '+'}</span>
                {formatMoney({ ...item.amount, amount: Math.abs(item.amount.amount) }, { cents: true })}
              </dd>
            </div>
          );
        })}
      </dl>
    </Card>
  );
}
