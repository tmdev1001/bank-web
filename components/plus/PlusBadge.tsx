import styles from './PlusHeader.module.css';

/**
 * The PLUS product badge.
 *
 * Deliberately small and secondary: BANK remains the dominant brand and PLUS
 * reads as the plan, not a second logo (spec section 3).
 */
export function PlusBadge({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={styles.badge} data-tone={tone}>
      Plus
    </span>
  );
}
