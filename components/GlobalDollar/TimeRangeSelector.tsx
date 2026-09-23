import { RANGES, type RangeKey } from '@/lib/marketData';
import styles from './GlobalDollar.module.css';

interface SelectorProps {
  value: RangeKey;
  onChange: (range: RangeKey) => void;
}

/**
 * Range selector.
 *
 * Built as a tablist so the relationship between the controls and the chart is
 * exposed, and the selected range is announced rather than only shown by a
 * background colour.
 */
export function TimeRangeSelector({ value, onChange }: SelectorProps) {
  return (
    <div className={styles.ranges} role="tablist" aria-label="Chart time range">
      {RANGES.map((range) => (
        <button
          key={range}
          type="button"
          role="tab"
          aria-selected={range === value}
          className={styles.range}
          data-active={range === value}
          onClick={() => onChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
