import Link from 'next/link';
import { LIFE_MODES } from '@/content/plus/lifeModes';
import { Icon } from '@/components/ui/Icon';
import styles from './LifeModes.module.css';

/**
 * Black section, white type (spec section 6).
 *
 * The check marks are decorative: a list already conveys "these are included",
 * and repeating "tick" before every item would add noise for a screen reader
 * without adding meaning.
 */
export function LifeModes({ containerClass }: { containerClass: string }) {
  return (
    <section className={`${styles.section} onDark`} aria-labelledby="life-heading">
      <div className={containerClass}>
        <h2 id="life-heading" className={styles.heading}>
          Designed for every
          <br />
          part of your life.
        </h2>

        <ul className={styles.grid}>
          {LIFE_MODES.map((mode) => (
            <li key={mode.id} className={styles.mode}>
              <Icon name={mode.icon} size={22} />
              <h3 className={styles.modeLabel}>{mode.label}</h3>
              <p className={styles.modeHeadline}>{mode.headline}</p>

              <ul className={styles.features}>
                {mode.features.map((feature) => (
                  <li key={feature}>
                    <span className={styles.tick} aria-hidden="true">
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={mode.href} className={`textLink ${styles.link}`}>
                Learn more
                <Icon name="arrowRight" size={14} />
                <span className="visuallyHidden">&nbsp;about {mode.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
