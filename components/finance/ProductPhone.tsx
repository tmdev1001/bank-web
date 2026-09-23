import type { CapitalSummary } from '@/lib/domain';
import { formatMoney } from '@/lib/domain';
import { referenceSeries } from '@/lib/bankData';
import styles from './ProductPhone.module.css';

const ACTIONS = ['Send', 'Receive', 'Exchange', 'Invest', 'More'];

function spark(series: number[]): string {
  const step = 200 / (series.length - 1);
  return series
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)} ${(56 - v * 52).toFixed(1)}`)
    .join(' ');
}

/**
 * The Bank product render, driven by domain data rather than literals.
 *
 * A component, not a background image: it stays crisp at any density, needs no
 * AVIF/WebP pipeline, and reserves its box via aspect-ratio so it contributes
 * nothing to CLS.
 *
 * Exposed as ONE labelled image. A screen reader gets a sentence it can use
 * instead of a wall of decorative figures.
 */
export function ProductPhone({
  capital,
  label,
  badge,
  seed = 7,
}: {
  capital: CapitalSummary;
  label: string;
  badge?: string;
  seed?: number;
}) {
  const rows = [
    { label: 'Cash', value: capital.cash },
    { label: 'Invested', value: capital.invested },
    { label: 'Reserve', value: capital.reserve },
  ];

  return (
    <div
      className={styles.phone}
      role="img"
      aria-label={`The Bank app showing ${label} with a total of ${formatMoney(capital.total, { cents: true })}, split across cash, invested and reserve balances.`}
    >
      <div className={styles.screen} aria-hidden="true">
        <div className={styles.status}>
          <span>9:41</span>
          <span className={styles.statusDots} />
        </div>

        <div className={styles.appBar}>
          <span className={styles.appTitle}>
            <span className="wordmark" style={{ fontSize: 12 }}>
              Bank
            </span>
            {badge && <span className={styles.appBadge}>{badge}</span>}
          </span>
          <span className={styles.bell} />
        </div>

        <p className={styles.label}>{label}</p>
        <p className={styles.total}>{formatMoney(capital.total, { cents: true })}</p>

        <div className={styles.card}>
          <p className={styles.label}>Global Dollar</p>
          <p className={styles.reference}>$1.00</p>
          <p className={styles.sub}>Global Reference</p>
          <svg viewBox="0 0 200 56" className={styles.spark} preserveAspectRatio="none">
            <path d={spark(referenceSeries(seed, 20))} fill="none" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </div>

        <dl className={styles.rows}>
          {rows.map((row) => (
            <div key={row.label} className={styles.row}>
              <dt>{row.label}</dt>
              <dd className="tabular">{formatMoney(row.value)}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.actions}>
          {ACTIONS.map((action) => (
            <span key={action} className={styles.action}>
              <span className={styles.actionDot} />
              {action}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
