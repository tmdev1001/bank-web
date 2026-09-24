import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import styles from './Hero.module.css';

/** Headline, supporting copy, actions and the security line. */
export function HeroContent() {
  return (
    <div className={styles.content}>
      <h1 id="hero-heading" className={styles.headline}>
        Money moves.
        <br />
        Life moves.
      </h1>

      <p className={styles.lede}>
        A more open financial future awaits.
      </p>

      <div className={styles.actions}>
        <Link href="/get-started" className="btn btnPrimary">
          Get Started
        </Link>
        <Link href="/explore" className={`btn btnSecondary ${styles.exploreBtn}`}>
          Explore Bank
        </Link>
      </div>

      <p className={styles.security}>
        <Icon name="lock" size={16} />
        Bank is built with bank-grade security and privacy by design.
      </p>
    </div>
  );
}
