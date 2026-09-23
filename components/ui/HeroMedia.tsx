import Image, { type StaticImageData } from 'next/image';
import styles from './HeroMedia.module.css';

/**
 * A photographic panel.
 *
 * Wraps `next/image` so every photograph on the site gets the same treatment:
 *
 *   • AVIF/WebP negotiation and a responsive srcset, from `next.config.ts`.
 *   • A reserved box via `aspect-ratio`, so images contribute nothing to CLS.
 *     `fill` needs a sized parent, and this is that parent.
 *   • A blur placeholder, available for free because the source is statically
 *     imported rather than referenced by string path.
 *   • Required, meaningful `alt`. The prop is not optional: a decorative
 *     photograph still needs an explicit empty string, which has to be a
 *     decision rather than an omission.
 *
 * `priority` marks the one above-the-fold image per page as the LCP candidate
 * so it is preloaded instead of lazy-loaded.
 */
export function HeroMedia({
  src,
  alt,
  ratio = '4 / 5',
  priority = false,
  sizes = '(max-width: 767px) 100vw, 45vw',
  className = '',
  rounded = true,
}: {
  src: StaticImageData;
  alt: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: boolean;
}) {
  return (
    <div
      className={`${styles.frame} ${rounded ? styles.rounded : ''} ${className}`.trim()}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={styles.image}
      />
    </div>
  );
}
