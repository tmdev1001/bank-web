import Link from 'next/link';
import { ALPHA, INVEST_LINKS } from '@/content/plus/alpha';
import { Icon } from '@/components/ui/Icon';
import styles from './InvestAlpha.module.css';

/**
 * Invest, and the Alpha preview within it (spec section 7).
 *
 * The naming boundary is load-bearing and is stated in the copy, not just in
 * a comment: Bank owns the financial relationship and infrastructure; Alpha
 * operates the portfolio intelligence system inside it. Alpha is never
 * presented as "Bank Alpha".
 *
 * Risk Check and Authorize are shown as separate stages because they are
 * separate authorities — intelligence does not authorize its own risk.
 */
export function InvestAlpha({ containerClass }: { containerClass: string }) {
  return (
    <section className={styles.section} aria-labelledby="invest-heading">
      <div className={containerClass}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Invest</p>
            <h2 id="invest-heading" className={styles.heading}>
              {ALPHA.name}
            </h2>
            <p className={styles.expansion}>{ALPHA.expansion}</p>
            <p className={styles.copy}>{ALPHA.headline}</p>
            <p className={styles.boundary}>
              Bank owns the financial relationship and infrastructure. {ALPHA.name} operates the
              portfolio intelligence system.
            </p>

            <div className={styles.actions}>
              <Link href={ALPHA.route} className="btn btnPrimary">
                Open {ALPHA.name}
              </Link>
              <Link href="/invest" className="btn btnSecondary">
                Explore Invest
              </Link>
            </div>

            <ul className={styles.investLinks}>
              {INVEST_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.investLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.pipelinePanel}>
            <p className={styles.pipelineLabel}>{ALPHA.name} handles</p>
            {/* An ordered list: the sequence is meaning, not decoration. */}
            <ol className={`${styles.pipeline} rail`}>
              {ALPHA.stages.map((stage, index) => (
                <li key={stage} className={styles.stage}>
                  <span className={styles.stageIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.stageName}>{stage}</span>
                </li>
              ))}
            </ol>
            <p className={styles.pipelineNote}>
              <Icon name="protect" size={14} />
              Risk Check and Authorize are independent stages. {ALPHA.name} cannot approve its own
              risk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
