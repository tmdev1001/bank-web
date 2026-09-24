'use client';

import type { CurrencyRate } from '@/lib/marketData';
import { Change } from '@/components/ui/Change';
import { AnimatedValue } from '@/components/ui/AnimatedValue';
import styles from './GlobalDollar.module.css';

/**
 * Reference rates.
 *
 * A real table, not a grid of divs: these are tabular data with headers, and
 * the markup should say so. On mobile it becomes horizontally scrollable
 * rather than shrinking the figures until they truncate.
 */
export function CurrencyTicker({ currencies }: { currencies: CurrencyRate[] }) {
  return (
    <div className={`${styles.tickerScroll} rail`}>
      <table className={styles.ticker}>
        <caption className="visuallyHidden">
          Global Dollar reference rates by currency, with change over the selected range
        </caption>
        <thead>
          <tr>
            {currencies.map((currency) => (
              <th key={currency.code} scope="col" className={styles.tickerCode}>
                <abbr title={currency.name}>{currency.code}</abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {currencies.map((currency) => (
              <td key={currency.code} className={`${styles.tickerRate} tabular`}>
                <AnimatedValue value={currency.rate.toFixed(2)} />
              </td>
            ))}
          </tr>
          <tr>
            {currencies.map((currency) => (
              <td key={currency.code} className={styles.tickerChange}>
                <Change value={currency.change} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
