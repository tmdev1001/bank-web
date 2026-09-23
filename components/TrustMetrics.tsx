import Link from 'next/link';
import { ALL_METRICS_VERIFIED, TRUST_METRICS } from '@/content/metrics';
import styles from './TrustMetrics.module.css';

/**
 * Trust metrics and the Join Bank CTA.
 *
 * The qualifier below the figures is not decoration. The spec says these
 * numbers are placeholders "until substantiated" and that unverified
 * operating metrics must not be published, so the component states their
 * status for as long as `content/metrics.ts` marks any of them unverified.
 * Substantiate the figures, flip the flags, and the line disappears.
 */
export function TrustMetrics() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="trust-heading">
      <div className={styles.layout}>
        <div className={styles.metricsPanel}>
          <h2 id="trust-heading" className={styles.heading}>
            Trusted to move what matters.
          </h2>

          <dl className={styles.metrics}>
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <dt className={styles.metricValue}>{metric.value}</dt>
                <dd className={styles.metricLabel}>{metric.label}</dd>
              </div>
            ))}
          </dl>

          {!ALL_METRICS_VERIFIED && (
            <p className={styles.qualifier}>
              Figures shown are illustrative and pending verification.
            </p>
          )}
        </div>

        <div className={`${styles.cta} onDark`}>
          <p className={styles.ctaCopy}>
            Ready to experience
            <br />a better way to move money?
          </p>
          <Link href="/get-started" className={`btn ${styles.ctaButton}`}>
            Join Bank
          </Link>
        </div>
      </div>
    </section>
  );
}
