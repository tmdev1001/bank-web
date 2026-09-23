import styles from './BankPlusPhone.module.css';

/**
 * The Bank Plus product render (spec section 4).
 *
 * A component, not a background image — so it stays crisp at every density,
 * needs no AVIF/WebP pipeline, and contributes nothing to CLS because its box
 * is reserved by aspect-ratio before paint.
 *
 * Every figure is product ILLUSTRATION. It is not account data and is
 * deliberately not wired to `lib/marketData`: a real balance on a marketing
 * page would imply a signed-in session.
 */

const BALANCES = [
  { label: 'Cash', value: '$18,400' },
  { label: 'Invested', value: '$24,280' },
  { label: 'Reserve', value: '$12,804' },
];

const ACTIONS = ['Send', 'Receive', 'Exchange', 'Invest', 'More'];
const TABS = ['Home', 'Capital', 'Global $', 'Activity', 'Profile'];

const SPARKLINE =
  'M2 46 L13 43 L24 47 L35 39 L46 42 L57 34 L68 37 L79 29 L90 32 L101 25 L112 28 L123 19 L134 23 L145 15 L156 18 L167 10 L178 13 L196 7';

export function BankPlusPhone() {
  return (
    <div
      className={styles.phone}
      role="img"
      aria-label="The Bank Plus app, showing total capital of forty-two thousand six hundred eighty dollars up three point one percent today, the Global Dollar reference at one dollar, and balances split across cash, invested and reserve."
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
            <span className={styles.appBadge}>Plus</span>
          </span>
          <span className={styles.bell} />
        </div>

        <p className={styles.label}>Total Capital</p>
        <p className={styles.total}>$42,680.24</p>
        <p className={styles.delta}>+$1,284.32 &nbsp;+3.1% &nbsp;Today</p>

        <div className={styles.card}>
          <p className={styles.label}>Global Dollar</p>
          <p className={styles.reference}>$1.00</p>
          <p className={styles.sub}>Global Reference</p>
          <svg viewBox="0 0 200 56" className={styles.spark} preserveAspectRatio="none">
            <path d={SPARKLINE} fill="none" stroke="currentColor" strokeWidth="1.7" />
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

        <div className={styles.actions}>
          {ACTIONS.map((action) => (
            <span key={action} className={styles.action}>
              <span className={styles.actionDot} />
              {action}
            </span>
          ))}
        </div>

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <span key={tab} className={styles.tab}>
              <span className={styles.tabDot} />
              {tab}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
