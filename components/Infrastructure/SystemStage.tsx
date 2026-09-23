import type { SystemStageItem } from '@/content/infrastructure';
import { Icon } from '@/components/ui/Icon';
import styles from './Infrastructure.module.css';

export function SystemStage({ stage, index }: { stage: SystemStageItem; index: number }) {
  return (
    <li className={styles.stage}>
      {/* The connector is decorative; the ordered list already conveys sequence. */}
      <span className={styles.connector} aria-hidden="true" />
      <Icon name={stage.id} size={24} />
      <h3 className={styles.stageLabel}>
        <span className="visuallyHidden">Step {index + 1}: </span>
        {stage.label}
      </h3>
      <p className={styles.stageCopy}>{stage.description}</p>
    </li>
  );
}
