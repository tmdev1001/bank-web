import type { Capability } from '@/content/capabilities';
import { Icon } from '@/components/ui/Icon';
import styles from './CapabilityGrid.module.css';

export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <li className={styles.card}>
      <Icon name={capability.id} size={26} />
      <h3 className={styles.label}>{capability.label}</h3>
      <p className={styles.description}>{capability.description}</p>
    </li>
  );
}
