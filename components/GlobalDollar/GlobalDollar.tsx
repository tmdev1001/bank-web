import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { getGlobalDollar } from '@/lib/marketData';
import { GlobalDollarPanel } from './GlobalDollarPanel';
import styles from './GlobalDollar.module.css';

/**
 * Global Dollar — one of the homepage's major product sections.
 *
 * Data comes from the market-data seam rather than literals in the markup, so
 * connecting a real feed is a change to `lib/marketData` alone. While the
 * feed is not live the section says so, in text, beside the figures: an
 * unlabelled rate on a bank's homepage reads as a quote.
 */
export async function GlobalDollar() {
  const data = await getGlobalDollar();

  return (
    <section className={`container ${styles.section}`} aria-labelledby="global-dollar-heading">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className="eyebrow">Global Dollar</p>
          <p className={styles.reference}>
            ${data.reference.toFixed(2)}
          </p>
          <h2 id="global-dollar-heading" className={styles.subhead}>
            One reference. Many currencies.
          </h2>
          <p className={styles.copy}>
            The Global Dollar provides a common reference for understanding movement across
            currencies and global markets.
          </p>
          <Link href="/global-dollar" className={`textLink ${styles.link}`}>
            Explore Global Dollar
            <Icon name="arrowRight" size={15} />
          </Link>
          {!data.isLive && (
            <p className={styles.provenance}>{data.source}</p>
          )}
        </div>

        <GlobalDollarPanel data={data} />
      </div>
    </section>
  );
}
