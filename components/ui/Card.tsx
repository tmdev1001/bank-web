import styles from './ui.module.css';

/**
 * The standard card. `interactive` adds the 2px hover lift — only where an
 * interaction genuinely exists, per the spec.
 */
export function Card({
  children,
  className = '',
  interactive = false,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  return (
    <Tag className={`${styles.card} ${interactive ? styles.cardInteractive : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

export function CardHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className={styles.cardHeader}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {action}
    </div>
  );
}
