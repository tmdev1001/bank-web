import styles from './finance.module.css';

export interface Slice {
  label: string;
  share: number;
}

/**
 * A donut.
 *
 * Shares are supplied already normalized by the caller so the ring always
 * totals 100%; segments are three greys, and the legend labels each one, so
 * nothing depends on distinguishing tones.
 */
export function AllocationChart({
  slices,
  centreValue,
  centreLabel,
  size = 96,
}: {
  slices: Slice[];
  centreValue?: string;
  centreLabel?: string;
  size?: number;
}) {
  const R = 36;
  const C = 2 * Math.PI * R;
  const tones = ['#0a0a0a', '#6e6e6e', '#b4b4b4', '#d8d8d8', '#ececec'];
  let offset = 0;
  const total = slices.reduce((s, x) => s + x.share, 0) || 1;
  const summary = slices
    .map((s) => `${s.label} ${Math.round((s.share / total) * 100)}%`)
    .join(', ');

  return (
    <div className={styles.allocation}>
      <div className={styles.donutWrap} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className={styles.donut} role="img" aria-label={`Allocation: ${summary}`}>
          {slices.map((s, i) => {
            const dash = (s.share / total) * C;
            const seg = (
              <circle
                key={s.label}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={tones[i % tones.length]}
                strokeWidth="14"
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 50 50)"
              />
            );
            offset += dash;
            return seg;
          })}
        </svg>
        {centreValue && (
          <div className={styles.donutCentre} aria-hidden="true">
            <span className={styles.donutValue}>{centreValue}</span>
            {centreLabel && <span className={styles.donutLabel}>{centreLabel}</span>}
          </div>
        )}
      </div>

      <ul className={styles.legend}>
        {slices.map((s, i) => (
          <li key={s.label}>
            <span className={styles.swatch} style={{ background: tones[i % tones.length] }} aria-hidden="true" />
            {s.label}
            <span className={`${styles.legendValue} tabular`}>
              {Math.round((s.share / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
