import Link from 'next/link';
import type { CapitalSummary } from '@/lib/domain';
import { Icon, type IconName } from '@/components/ui/Icon';
import { ProductPhone } from '@/components/finance/ProductPhone';
import type { PageMedia } from '@/content/media';
import styles from './ProductPage.module.css';

/** Full-bleed hero backgrounds from `.assets/source` (same set as the home hero). */
export type ProductHeroBackground = 'personal' | 'business' | 'family' | 'travel' | 'invest';

export interface ProductFunction {
  icon: IconName;
  label: string;
}

/**
 * Shared shell for the four persona pages.
 *
 * Personal, Business, Family and Travel differ in copy, data and modules —
 * not in structure. Sharing the shell is what makes them read as one product
 * rather than four sites, and it means a change to the hero or the function
 * row lands everywhere at once.
 */
export function ProductHero({
  headline,
  copy,
  primaryCta,
  secondaryCta,
  capital,
  phoneLabel,
  seed,
  media,
  heroBackground,
}: {
  headline: React.ReactNode;
  copy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  capital: CapitalSummary;
  phoneLabel: string;
  seed?: number;
  /** Optional page photograph, shown beside the product render. */
  media?: PageMedia;
  /** Full-width hero photograph behind the grid (matches home hero behavior). */
  heroBackground?: ProductHeroBackground;
}) {
  const heroBody = (
    <>
      <div className={styles.heroContent}>
        <h1 id="product-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.copy}>{copy}</p>
        <div className={styles.actions}>
          <Link href={primaryCta.href} className="btn btnPrimary">
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className={`btn btnSecondary${heroBackground ? ` ${styles.secondaryBtn}` : ''}`}
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
      <div className={styles.heroVisual} data-media={Boolean(media)}>
        <ProductPhone capital={capital} label={phoneLabel} seed={seed} />
      </div>
    </>
  );

  if (heroBackground) {
    return (
      <section
        className={styles.heroShell}
        data-bg={heroBackground}
        aria-labelledby="product-heading"
      >
        <div className={`container ${styles.hero}`}>{heroBody}</div>
      </section>
    );
  }

  return (
    <section className={`container ${styles.hero}`} aria-labelledby="product-heading">
      {heroBody}
    </section>
  );
}

/** The icon row beneath every product hero. */
export function FunctionRow({ functions }: { functions: ProductFunction[] }) {
  return (
    <section className={`container ${styles.functions}`} aria-label="Capabilities">
      <ul className={`${styles.functionList} rail`}>
        {functions.map((fn) => (
          <li key={fn.label} className={styles.function}>
            <Icon name={fn.icon} size={24} />
            <span className={styles.functionLabel}>{fn.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Section heading used above each page's module grid. */
export function ModuleSection({
  title,
  children,
  columns = 2,
}: {
  title: string;
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}) {
  return (
    <section className={`container ${styles.modules}`} aria-labelledby="modules-heading">
      <h2 id="modules-heading" className={styles.modulesHeading}>
        {title}
      </h2>
      <div className={styles.grid} data-columns={columns}>
        {children}
      </div>
    </section>
  );
}

/** The black conversion band that closes every product page. */
export function ProductCTA({
  headline,
  copy,
  cta,
}: {
  headline: string;
  copy: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className={`container ${styles.ctaWrap}`}>
      <div className={`${styles.cta} onDark`}>
        <div>
          <h2 className={styles.ctaHeading}>{headline}</h2>
          <p className={styles.ctaCopy}>{copy}</p>
        </div>
        <Link href={cta.href} className={`btn ${styles.ctaButton}`}>
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
