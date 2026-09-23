import type { AlphaDecision, AlphaStatus, Position } from '@/lib/domain';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Change } from '@/components/ui/Change';
import styles from './alpha.module.css';

/**
 * System and risk status.
 *
 * Every state is carried by a WORD, not a colour: "Paper", "Nominal", "Bull".
 * A status light alone would fail both the spec's rule on financial state and
 * anyone reading in greyscale.
 */
export function AlphaStatusPanel({ status }: { status: AlphaStatus }) {
  const tone =
    status.status === 'nominal' ? 'positive' : status.status === 'degraded' ? 'negative' : 'negative';

  return (
    <Card>
      <CardHeader
        title="System Status"
        action={<Badge tone={tone}>{status.status}</Badge>}
      />
      <dl className={styles.statusRows}>
        <div className={styles.statusRow}>
          <dt>Mode</dt>
          <dd>
            <Badge tone={status.mode === 'live' ? 'dark' : 'neutral'}>{status.mode}</Badge>
          </dd>
        </div>
        <div className={styles.statusRow}>
          <dt>Market regime</dt>
          <dd>{status.marketRegime}</dd>
        </div>
        <div className={styles.statusRow}>
          <dt>Invested</dt>
          <dd className="tabular">{Math.round(status.investedPct * 100)}%</dd>
        </div>
        <div className={styles.statusRow}>
          <dt>Reserve</dt>
          <dd className="tabular">{Math.round(status.reservePct * 100)}%</dd>
        </div>
      </dl>
    </Card>
  );
}

/** Holdings, as a table because they are tabular data with headers. */
export function PositionsPanel({ positions }: { positions: Position[] }) {
  return (
    <Card>
      <CardHeader title="Top Holdings" />
      <table className={styles.table}>
        <caption className="visuallyHidden">Top holdings by portfolio weight, with daily change</caption>
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Weight</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.symbol}>
              <th scope="row">
                <span className={styles.symbol}>{position.symbol}</span>
                <span className={styles.symbolName}>{position.name}</span>
              </th>
              <td className="tabular">{Math.round(position.weight * 100)}%</td>
              <td>
                <Change value={position.changePct / 100} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/**
 * Alpha decisions.
 *
 * Each opportunity resolves to BUY, HOLD, SELL or NO_TRADE. NO_TRADE is a
 * deliberate outcome and is shown as one — not as an absence — so a quiet
 * session is distinguishable from a broken one.
 */
export function DecisionFeed({ decisions }: { decisions: AlphaDecision[] }) {
  return (
    <Card>
      <CardHeader title="Alpha Decisions" />
      <ul className={styles.decisions}>
        {decisions.map((decision) => (
          <li key={decision.id} className={styles.decision}>
            <span className={styles.decisionAction} data-action={decision.action}>
              {decision.action.replace('_', ' ')}
            </span>
            <span className={styles.decisionBody}>
              <span className={styles.decisionSymbol}>{decision.symbol}</span>
              <span className={styles.decisionReason}>{decision.reason}</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** Risk controls, stated as rules rather than a score. */
export function RiskPanel() {
  const rules = [
    { label: 'Stop policy', value: 'Volatility-adaptive (ATR)' },
    { label: 'Reserve floor', value: 'Protected, never deployable' },
    { label: 'Daily loss breaker', value: 'Tiered, ratchets within a day' },
    { label: 'Authorization', value: 'Independent of intelligence' },
  ];

  return (
    <Card>
      <CardHeader title="Risk Status" />
      <dl className={styles.statusRows}>
        {rules.map((rule) => (
          <div key={rule.label} className={styles.statusRow}>
            <dt>{rule.label}</dt>
            <dd>{rule.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
