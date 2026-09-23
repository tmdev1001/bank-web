import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { getGlobalDollar } from '@/lib/marketData';
import { GlobalDollarPanel } from '@/components/GlobalDollar/GlobalDollarPanel';
import styles from './PlusGlobalDollar.module.css';

/**
 * Global Dollar for Bank Plus (spec section 8).
 *
 * Reuses the same market-data seam and the same interactive panel as the BANK
 * homepage, so a real feed lands in both places at once. The spec's own note —
 * "Market values must come from a real data source in production. Values shown
 * in the design are mock data" — is enforced by the seam, and the section
 * states its provenance while `isLive` is false.
 */
export async function PlusGlobalDollar({ containerClass }: { containerClass: string }) {
  const data = await getGlobalDollar();

  return (
    <section className={styles.section} aria-labelledby="plus-gd-heading">
      <div className={containerClass}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h2 id="plus-gd-heading" className={styles.heading}>
              The Global Dollar.
              <br />
              One reference.
              <br />
              Many possibilities.
            </h2>
            <p className={styles.copy}>
              The Global Dollar gives you a real-time reference for understanding value across
              currencies and global markets.
            </p>
            <Link href="/global-dollar" className="btn btnPrimary">
              Explore Global Dollar
            </Link>
            {!data.isLive && <p className={styles.provenance}>{data.source}</p>}
          </div>

          <div className={styles.module}>
            <div className={styles.moduleHead}>
              <p className={styles.moduleLabel}>Global Dollar</p>
              <p className={styles.reference}>${data.reference.toFixed(2)}</p>
              <p className={styles.moduleSub}>Global Reference</p>
            </div>
            <GlobalDollarPanel data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
