import { MEDIA } from '@/content/media';
import { HeroMedia } from '@/components/ui/HeroMedia';
import { BankPhone } from './BankPhone';
import { HeroContent } from './HeroContent';
import styles from './Hero.module.css';

/**
 * Hero composition.
 *
 * Desktop is roughly 50/50 and tablet roughly 55/45; below 768px the grid
 * collapses to one column and source order becomes the render order the spec
 * asks for — headline, copy, CTAs, security line, then the phone.
 */
export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-heading">
      <HeroContent />
      <div className={styles.visual}>
        <HeroMedia
          src={MEDIA.home.src}
          alt={MEDIA.home.alt}
          ratio="3 / 4"
          priority
          sizes="(max-width: 767px) 100vw, 30vw"
          className={styles.photo}
        />
        <BankPhone />
      </div>
    </section>
  );
}
