import styles from './alpha.module.css';

/**
 * The Alpha system loop.
 *
 * Nine stages, and the separation matters: Risk Check and Authorize are
 * distinct authorities, because intelligence does not authorize its own risk.
 * Rendered as an ordered list — the sequence is meaning, not decoration.
 */
export const ALPHA_STAGES = [
  'Observe',
  'Analyze',
  'Decide',
  'Risk Check',
  'Authorize',
  'Execute',
  'Reconcile',
  'Measure',
  'Learn',
] as const;

export function AlphaLoop({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`${styles.loop} rail`} data-compact={compact}>
      {ALPHA_STAGES.map((stage, index) => (
        <li key={stage} className={styles.stage}>
          <span className={styles.stageIndex} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={styles.stageName}>{stage}</span>
        </li>
      ))}
    </ol>
  );
}
