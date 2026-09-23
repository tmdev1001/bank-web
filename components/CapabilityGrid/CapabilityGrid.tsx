import { CAPABILITIES } from '@/content/capabilities';
import { CapabilityCard } from './CapabilityCard';
import styles from './CapabilityGrid.module.css';

/**
 * Six capabilities: 6x1 on desktop, 3x2 on tablet, a horizontal snap rail on
 * mobile.
 *
 * The rail is deliberate. Six modules squeezed into a 375px row would push
 * the labels below the readable floor, so below 768px they scroll instead of
 * shrinking — the spec's own recommendation.
 */
export function CapabilityGrid() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="capabilities-heading">
      <h2 id="capabilities-heading" className="visuallyHidden">
        Core capabilities
      </h2>
      <ul className={`${styles.grid} rail`}>
        {CAPABILITIES.map((capability) => (
          <CapabilityCard key={capability.id} capability={capability} />
        ))}
      </ul>
    </section>
  );
}
