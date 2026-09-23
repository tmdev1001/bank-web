import Link from 'next/link';
import type { FinancialLifeItem } from '@/content/financialLife';
import { Icon } from '@/components/ui/Icon';
import styles from './FinancialLife.module.css';

/**
 * A black BANK card render, used by Personal and Business.
 *
 * Exposed as a labelled image rather than hidden: section 14 asks for
 * meaningful text alternatives for product imagery, and "a black BANK Visa
 * card" is information a screen-reader user would otherwise lose entirely.
 * Its internals are image detail, so they carry no separate semantics.
 */
function CardArt({ label }: { label: string }) {
  return (
    <div className={styles.cardArt} role="img" aria-label={`The black BANK Visa card for ${label}`}>
      <span className="wordmark" style={{ fontSize: 12, color: '#fff' }} aria-hidden="true">
        Bank
      </span>
      <span className={styles.cardScheme} aria-hidden="true">
        VISA
      </span>
    </div>
  );
}

export function FinancialLifeCard({ item }: { item: FinancialLifeItem }) {
  return (
    <li className={styles.card}>
      <p className={`eyebrow ${styles.eyebrow}`}>{item.eyebrow}</p>
      <h3 className={styles.headline}>{item.headline}</h3>

      <div className={styles.visual}>
        {item.visual === 'card' ? (
          <CardArt label={item.eyebrow.toLowerCase()} />
        ) : (
          <Icon name={item.visual === 'family' ? 'family' : 'globe'} size={56} strokeWidth={1} />
        )}
      </div>

      <Link href={item.href} className={`textLink ${styles.link}`}>
        Learn more
        <Icon name="arrowRight" size={15} />
        {/* The visible label repeats across four cards, so each link gets a
            distinct accessible name for anyone navigating by link list. */}
        <span className="visuallyHidden">about {item.eyebrow.toLowerCase()} banking</span>
      </Link>
    </li>
  );
}
