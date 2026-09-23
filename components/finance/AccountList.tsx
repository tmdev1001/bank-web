import type { Account } from '@/lib/domain';
import { formatMoney } from '@/lib/domain';
import { Card, CardHeader } from '@/components/ui/Card';
import styles from './finance.module.css';

/** Accounts as a description list — name/type is the term, balance the value. */
export function AccountList({ accounts, title = 'Accounts' }: { accounts: Account[]; title?: string }) {
  return (
    <Card>
      <CardHeader title={title} />
      <dl className={styles.rows}>
        {accounts.map((account) => (
          <div key={account.id} className={styles.row}>
            <dt>
              <span className={styles.rowLabel}>{account.name}</span>
              <span className={styles.rowMeta}>{account.type}</span>
            </dt>
            <dd className={`${styles.rowValue} tabular`}>{formatMoney(account.balance, { cents: true })}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
