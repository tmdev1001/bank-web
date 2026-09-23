import { Icon } from '@/components/ui/Icon';
import styles from './BankPhone.module.css';

/**
 * The BANK product interface, as a reusable component rather than a flat
 * image baked into the page (spec section 4).
 *
 * The figures are PRODUCT ILLUSTRATION, not account data and not market data.
 * They never come from `lib/marketData` and must not be wired to it: this is
 * a picture of the app, and a real balance rendered here would imply a
 * signed-in session on a marketing page.
 *
 * Accessibility: the whole device is exposed as a single labelled image. A
 * screen reader gets one meaningful sentence instead of a wall of decorative
 * numbers it cannot act on.
 */

const ACTIONS = ['Send', 'Receive', 'Exchange', 'Invest', 'More'] as const;

const BALANCES = [
  { label: 'Cash', value: '$18,400' },
  { label: 'Invested', value: '$24,280' },
  { label: 'Reserve', value: '$12,804' },
];

/** Static sparkline path — decorative, drawn to fit the 200x56 viewBox. */
const SPARKLINE =
  'M2 44 L14 41 L26 45 L38 38 L50 40 L62 33 L74 35 L86 28 L98 31 L110 24 L122 27 L134 18 L146 22 L158 14 L170 17 L182 9 L198 12';

export function BankPhone({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={styles.phone}
      data-compact={compact}
      role="img"
      aria-label="The BANK mobile app, showing total capital, a Global Dollar reference chart, and balances split across cash, invested and reserve."
    >
      <div className={styles.screen} aria-hidden="true">
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.statusIcons} />
        </div>

        <div className={styles.appBar}>
          <span className="wordmark" style={{ fontSize: 13 }}>
            Bank
          </span>
          <Icon name="bell" size={16} />
        </div>

        <p className={styles.metaLabel}>Total capital</p>
        <p className={styles.total}>$42,680.24</p>
        <p className={styles.delta}>+$1,264.32 &nbsp;+3.1%</p>

        <div className={styles.chartCard}>
          <p className={styles.metaLabel}>Global Dollar</p>
          <p className={styles.reference}>$1.00</p>
          <p className={styles.referenceNote}>Global Reference</p>
          <svg viewBox="0 0 200 56" className={styles.sparkline} preserveAspectRatio="none">
            <path d={SPARKLINE} fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </div>

        <dl className={styles.balances}>
          {BALANCES.map((row) => (
            <div key={row.label} className={styles.balanceRow}>
              <dt>{row.label}</dt>
              <dd className="tabular">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.tabBar}>
          {ACTIONS.map((action) => (
            <span key={action} className={styles.tab}>
              <span className={styles.tabDot} />
              {action}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
