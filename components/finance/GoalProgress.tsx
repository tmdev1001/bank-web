import type { Goal } from '@/lib/domain';
import { formatMoney } from '@/lib/domain';
import { Card, CardHeader } from '@/components/ui/Card';
import styles from './finance.module.css';

/**
 * Goals with native <progress> semantics, so the value is announced rather
 * than only drawn.
 */
export function GoalProgress({ goals, title = 'Goals' }: { goals: Goal[]; title?: string }) {
  return (
    <Card>
      <CardHeader title={title} />
      <ul className={styles.goals}>
        {goals.map((goal) => {
          const pct = Math.round((goal.saved.amount / goal.target.amount) * 100);
          return (
            <li key={goal.id}>
              <div className={styles.goalHead}>
                <span className={styles.rowLabel}>{goal.label}</span>
                <span className={`${styles.goalValue} tabular`}>
                  {formatMoney(goal.saved)} / {formatMoney(goal.target)}
                </span>
              </div>
              <progress
                className={styles.progress}
                value={goal.saved.amount}
                max={goal.target.amount}
                aria-label={`${goal.label}: ${pct}% of target saved`}
              >
                {pct}%
              </progress>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
