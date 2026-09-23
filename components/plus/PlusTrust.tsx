import Link from 'next/link';
import { PLUS_METRICS, PLUS_METRICS_VERIFIED } from '@/content/plus/metrics';
import { Icon } from '@/components/ui/Icon';
import styles from './PlusTrust.module.css';

/**
 * Trust metrics and the security module (spec section 9).
 *
 * Every figure is config-driven (`content/plus/metrics.ts`) rather than
 * hard-coded, as the spec requires, and carries a `verified` flag. While any
 * figure is unverified the section says so. "99.99% Uptime" in particular is a
 * measurable SLA claim; publishing it unsubstantiated is a commitment Bank
 * would be held to.
 */
export function PlusTrust({ containerClass }: { containerClass: string }) {
  return (
    <section className={styles.section} aria-labelledby="trust-heading">
      <div className={containerClass}>
        <h2 id="trust-heading" className={styles.heading}>
          Trusted to move what matters.
        </h2>

        <div className={styles.layout}>
          <div className={styles.metricsPanel}>
            <dl className={styles.metrics}>
              {PLUS_METRICS.map((metric) => (
                <div key={metric.id} className={styles.metric}>
                  <dt className={styles.metricValue}>{metric.value}</dt>
                  <dd className={styles.metricLabel}>{metric.label}</dd>
                </div>
              ))}
            </dl>
            {!PLUS_METRICS_VERIFIED && (
              <p className={styles.qualifier}>
                Figures shown are illustrative and pending verification.
              </p>
            )}
          </div>

          <div className={styles.security}>
            <span className={styles.securityIcon} aria-hidden="true">
              <Icon name="lock" size={22} />
            </span>
            <h3 className={styles.securityTitle}>Bank-Grade Security</h3>
            <p className={styles.securityCopy}>
              Your data and money are protected with industry-leading security and privacy.
            </p>
            <Link href="/resources/security" className={`textLink ${styles.securityLink}`}>
              Learn more
              <Icon name="arrowRight" size={14} />
              <span className="visuallyHidden">&nbsp;about Bank-grade security</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
