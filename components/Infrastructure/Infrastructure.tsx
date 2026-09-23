import Link from 'next/link';
import { SYSTEM_STAGES } from '@/content/infrastructure';
import { Icon } from '@/components/ui/Icon';
import { SystemStage } from './SystemStage';
import styles from './Infrastructure.module.css';

/**
 * The six-stage system story.
 *
 * An ordered list, because the stages are a sequence and that ordering is
 * meaning rather than styling. Below 768px it becomes a scrolling rail rather
 * than six descriptions crushed into one row.
 */
export function Infrastructure() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="infrastructure-heading">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <h2 id="infrastructure-heading" className="sectionHeading">
            Financial infrastructure
            <br />
            for the future.
          </h2>
          <p className={styles.copy}>
            Bank is more than a bank. It is a connected financial system built for continuous
            capital movement.
          </p>
          <Link href="/platform" className={`textLink ${styles.link}`}>
            Explore our platform
            <Icon name="arrowRight" size={15} />
          </Link>
        </div>

        <ol className={`${styles.stages} rail`}>
          {SYSTEM_STAGES.map((stage, index) => (
            <SystemStage key={stage.id} stage={stage} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
