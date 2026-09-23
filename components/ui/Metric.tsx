import type { Money } from '@/lib/domain';
import { formatMoney } from '@/lib/domain';
import { Change } from './Change';
import styles from './ui.module.css';

/**
 * A large financial figure with its label.
 *
 * Values are formatted through the domain helper, never string-built, so the
 * currency and grouping are consistent everywhere and the server and client
 * agree.
 */
export function Metric({
  label,
  value,
  changePct,
  size = 'md',
}: {
  label: string;
  value: Money | string;
  changePct?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className={styles.metric} data-size={size}>
      <p className={styles.metricLabel}>{label}</p>
      <p className={`${styles.metricValue} tabular`}>
        {typeof value === 'string' ? value : formatMoney(value, { cents: size === 'lg' })}
      </p>
      {changePct !== undefined && (
        <p className={styles.metricChange}>
          <Change value={changePct / 100} />
        </p>
      )}
    </div>
  );
}
