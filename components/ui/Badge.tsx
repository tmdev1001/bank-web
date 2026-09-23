import styles from './ui.module.css';

/**
 * A status badge.
 *
 * `tone` sets colour, but the LABEL always carries the meaning — status must
 * never be conveyed by colour alone.
 */
export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'positive' | 'negative' | 'dark';
}) {
  return (
    <span className={styles.badge} data-tone={tone}>
      {children}
    </span>
  );
}
