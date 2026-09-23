import Link from 'next/link';
import { ALLOCATIONS, GOALS, TOTAL_CAPITAL, allocationShares } from '@/content/plus/productFigures';
import type { CurrencyRate } from '@/lib/marketData';
import { Icon } from '@/components/ui/Icon';
import styles from './FeatureOverview.module.css';

/** Allocation donut, drawn from computed shares so it always totals 100%. */
function CapitalDonut() {
  const shares = allocationShares();
  const R = 36;
  const C = 2 * Math.PI * R;
  let offset = 0;
  // Three tones of grey rather than colour — the palette is monochrome, and
  // each segment is also labelled in the legend beside it.
  const tones = ['#0a0a0a', '#8a8a8a', '#d4d4d4'];

  return (
    <div className={styles.donutWrap}>
      <svg viewBox="0 0 100 100" className={styles.donut} aria-hidden="true">
        {shares.map((s, i) => {
          const dash = s.share * C;
          const seg = (
            <circle
              key={s.label}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={tones[i]}
              strokeWidth="13"
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 50 50)"
            />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <div className={styles.donutCentre}>
        <span className={styles.donutValue}>{TOTAL_CAPITAL.replace('.24', '')}</span>
        <span className={styles.donutLabel}>Total</span>
      </div>
    </div>
  );
}

function CapitalCard() {
  const shares = allocationShares();
  return (
    <FeatureCard title="Capital Overview" copy="See your entire financial picture in real time." action="View Capital" href="/plus/capital">
      <div className={styles.capital}>
        <CapitalDonut />
        <ul className={styles.legend}>
          {shares.map((s, i) => (
            <li key={s.label}>
              <span className={styles.swatch} data-tone={i} aria-hidden="true" />
              {s.label}
              <span className={`${styles.legendValue} tabular`}>{Math.round(s.share * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </FeatureCard>
  );
}

function GlobalDollarCard({ currencies }: { currencies: CurrencyRate[] }) {
  return (
    <FeatureCard title="Global Dollar" copy="One reference for a world of currencies." action="Explore" href="/global-dollar">
      <ul className={styles.rates}>
        {currencies.slice(0, 5).map((c) => (
          <li key={c.code}>
            <span>{c.code}</span>
            <span className="tabular">{c.rate.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </FeatureCard>
  );
}

function MoveMoneyCard() {
  return (
    <FeatureCard title="Move Money" copy="Send, receive, and exchange across currencies." action="Continue" href="/plus/move">
      <div className={styles.convert} aria-hidden="true">
        <p className={styles.convertLabel}>You send</p>
        <div className={styles.convertRow}>
          <span className="tabular">1,000.00</span>
          <span className={styles.chip}>USD</span>
        </div>
        <p className={styles.convertLabel}>They receive</p>
        <div className={styles.convertRow}>
          <span className="tabular">851.20</span>
          <span className={styles.chip}>EUR</span>
        </div>
        <dl className={styles.convertMeta}>
          <div>
            <dt>Rate</dt>
            <dd className="tabular">1 USD = 0.8512 EUR</dd>
          </div>
          <div>
            <dt>Fee</dt>
            <dd className="tabular">$0.00</dd>
          </div>
        </dl>
      </div>
    </FeatureCard>
  );
}

function InsightsCard() {
  return (
    <FeatureCard title="AI Insights" copy="Intelligence that helps you make confident decisions." action="View Insights" href="/plus/insights">
      <div className={styles.insight}>
        <p className={styles.insightTag}>Insight</p>
        <p className={styles.insightBody}>Your cash flow is strong this month.</p>
        <p className={styles.insightMeta}>You have $2,400 available to invest.</p>
      </div>
    </FeatureCard>
  );
}

function GoalsCard() {
  return (
    <FeatureCard title="Goals" copy="Track and achieve what matters most." action="Manage Goals" href="/plus/goals">
      <ul className={styles.goals}>
        {GOALS.map((goal) => {
          const pct = Math.round((goal.saved / goal.target) * 100);
          return (
            <li key={goal.label}>
              <div className={styles.goalHead}>
                <span>{goal.label}</span>
                <span className={`${styles.goalValue} tabular`}>{goal.display}</span>
              </div>
              {/* Native progress semantics: the value is announced, not just drawn. */}
              <progress className={styles.progress} value={goal.saved} max={goal.target}>
                {pct}%
              </progress>
            </li>
          );
        })}
      </ul>
    </FeatureCard>
  );
}

function FeatureCard({
  title,
  copy,
  action,
  href,
  children,
}: {
  title: string;
  copy: string;
  action: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardCopy}>{copy}</p>
      <div className={styles.cardVisual}>{children}</div>
      <Link href={href} className={`textLink ${styles.cardAction}`}>
        {action}
        <Icon name="arrowRight" size={14} />
        <span className="visuallyHidden">&nbsp;&mdash; {title}</span>
      </Link>
    </li>
  );
}

/**
 * Five modules: 5x1 desktop, 3+2 tablet, horizontal snap rail on mobile.
 * The spec is explicit that five cards must not be shrunk into one mobile row.
 */
export function FeatureOverview({
  currencies,
  containerClass,
}: {
  currencies: CurrencyRate[];
  containerClass: string;
}) {
  return (
    <section className={styles.section} aria-labelledby="everything-heading">
      <div className={containerClass}>
        <div className={styles.head}>
          <h2 id="everything-heading" className={styles.heading}>
            Everything you need.
            <br />
            In one place.
          </h2>
          <Link href="/plus/features" className={`textLink ${styles.seeAll}`}>
            See all features
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>

        <ul className={`${styles.grid} rail`}>
          <CapitalCard />
          <GlobalDollarCard currencies={currencies} />
          <MoveMoneyCard />
          <InsightsCard />
          <GoalsCard />
        </ul>
      </div>
    </section>
  );
}
