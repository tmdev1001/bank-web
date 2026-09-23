import styles from './finance.module.css';

const W = 1000;
const H = 260;

function toPath(series: number[]): string {
  if (series.length < 2) return '';
  const step = W / (series.length - 1);
  return series
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(2)} ${(H - v * H).toFixed(2)}`)
    .join(' ');
}

/**
 * A line chart.
 *
 * Accessibility (spec): exposed as a labelled image with a plain-language
 * summary, plus a sampled data table for anyone who needs values rather than
 * shape. `vector-effect` keeps the stroke 2px at any width, which is what lets
 * the chart be fully fluid without distorting.
 *
 * `comparison` renders in muted grey behind the primary black series.
 */
export function MarketChart({
  series,
  comparison,
  label,
  height = 'md',
}: {
  series: number[];
  comparison?: number[];
  label: string;
  height?: 'sm' | 'md' | 'lg';
}) {
  const first = series[0] ?? 0;
  const last = series[series.length - 1] ?? 0;
  const direction = last > first ? 'higher' : last < first ? 'lower' : 'level';
  const summary = `${label}. The series ends ${direction} than it began.`;

  return (
    <figure className={styles.chartFigure} data-height={height}>
      <svg className={styles.chart} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary}>
        {comparison && (
          <path
            d={toPath(comparison)}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
          />
        )}
        <path
          d={toPath(series)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <figcaption className="visuallyHidden">
        <p>{summary}</p>
        <table>
          <caption>{label}</caption>
          <thead>
            <tr>
              <th scope="col">Point</th>
              <th scope="col">Relative level</th>
            </tr>
          </thead>
          <tbody>
            {series
              .filter((_, i) => i % Math.ceil(series.length / 8) === 0)
              .map((v, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{Math.round(v * 100)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}
