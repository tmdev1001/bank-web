import Link from 'next/link';

import styles from './PlusCTA.module.css';

const POINTS = [
  { label: 'Open your account', detail: 'in minutes' },
  { label: 'No hidden fees', detail: 'Transparent pricing' },
  { label: 'AI-powered insights', detail: 'Built for your success' },
];

/** Full-width black conversion module (spec section 10). */
export function PlusCTA({ containerClass }: { containerClass: string }) {
  return (
    <section className={`${styles.section} onDark`} aria-labelledby="plus-cta-heading">
      <div className={containerClass}>
        <div className={styles.panel}>
          <h2 id="plus-cta-heading" className={styles.heading}>
            Ready to experience
            <br />
            Bank Plus?
          </h2>

          <ul className={styles.points}>
            {POINTS.map((point) => (
              <li key={point.label}>
                <span className={styles.tick} aria-hidden="true">
                  &#10003;
                </span>
                <span>
                  <strong>{point.label}</strong>
                  <span className={styles.pointDetail}>{point.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <Link href={'/plus/get-started'} className={`btn ${styles.cta}`}>
            Get Bank Plus
          </Link>
        </div>
      </div>
    </section>
  );
}
