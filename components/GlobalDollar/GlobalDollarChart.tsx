import type { RangeKey } from '@/lib/marketData';
import styles from './GlobalDollar.module.css';

const VIEW_W = 1000;
const VIEW_H = 260;

/** Build a polyline path across the full viewBox from a normalized series. */
function toPath(series: number[]): string {
  if (series.length < 2) return '';
  const step = VIEW_W / (series.length - 1);
  return series
    .map((value, index) => {
      const x = (index * step).toFixed(2);
      // SVG y grows downward; invert so a higher value draws higher.
      const y = (VIEW_H - value * VIEW_H).toFixed(2);
      return `${index === 0 ? 'M' : 'L'}${x} ${y}`;
    })
    .join(' ');
}

const RANGE_WORDS: Record<RangeKey, string> = {
  '1D': 'the past day',
  '1W': 'the past week',
  '1M': 'the past month',
  '3M': 'the past three months',
  '1Y': 'the past year',
};

interface ChartProps {
  series: number[];
  range: RangeKey;
  isLive: boolean;
}

/**
 * Global Dollar reference chart.
 *
 * Accessibility (spec section 14): the drawing is exposed as a single labelled
 * image with a plain-language summary, and the same figures are also available
 * as a real data table for anyone who needs the values rather than the shape.
 * A bare <svg> would be silent to a screen reader.
 */
export function GlobalDollarChart({ series, range, isLive }: ChartProps) {
  const first = series[0] ?? 0;
  const last = series[series.length - 1] ?? 0;
  const direction = last > first ? 'higher' : last < first ? 'lower' : 'level';
  const summary = `Global Dollar reference over ${RANGE_WORDS[range]}, trending ${direction}.${
    isLive ? '' : ' Reference shape only, not live market data.'
  }`;

  return (
    <figure className={styles.chartFigure}>
      <svg
        className={styles.chart}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={summary}
      >
        <path
          d={toPath(series)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          /* Keeps the line 2px at every width instead of stretching with the
             viewBox — the reason the chart can be fully fluid. */
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <figcaption className="visuallyHidden">
        <p>{summary}</p>
        <table>
          <caption>Global Dollar reference, {RANGE_WORDS[range]}</caption>
          <thead>
            <tr>
              <th scope="col">Point</th>
              <th scope="col">Relative level</th>
            </tr>
          </thead>
          <tbody>
            {/* Sampled rather than exhaustive: a few hundred rows would be
                unusable to read through, and the shape is what matters. */}
            {series
              .filter((_, index) => index % Math.ceil(series.length / 8) === 0)
              .map((value, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{Math.round(value * 100)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}
