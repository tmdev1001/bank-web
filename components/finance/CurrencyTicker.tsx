import type { MarketRate } from '@/lib/domain';
import { Change } from '@/components/ui/Change';
import styles from './finance.module.css';

/**
 * Reference rates as a real table with headers — these are tabular data and
 * the markup should say so. Scrolls horizontally on mobile rather than
 * compressing figures until they truncate.
 */
export function CurrencyTicker({ rates }: { rates: MarketRate[] }) {
  return (
    <div className={`${styles.tickerScroll} rail`}>
      <table className={styles.ticker}>
        <caption className="visuallyHidden">
          Global Dollar reference rates by currency, with change over the selected range
        </caption>
        <thead>
          <tr>
            {rates.map((rate) => (
              <th key={rate.symbol} scope="col" className={styles.tickerCode}>
                {rate.symbol}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {rates.map((rate) => (
              <td key={rate.symbol} className={`${styles.tickerRate} tabular`}>
                {rate.value.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            {rates.map((rate) => (
              <td key={rate.symbol} className={styles.tickerChange}>
                <Change value={rate.changePct / 100} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
