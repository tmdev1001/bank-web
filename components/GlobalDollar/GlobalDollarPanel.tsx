'use client';

import { useState } from 'react';
import type { GlobalDollarData, RangeKey } from '@/lib/marketData';
import { CurrencyTicker } from './CurrencyTicker';
import { GlobalDollarChart } from './GlobalDollarChart';
import { TimeRangeSelector } from './TimeRangeSelector';
import styles from './GlobalDollar.module.css';

/**
 * The interactive half of the section.
 *
 * Only this subtree is a client component; the section shell and its data
 * fetch stay on the server. Range state is the one thing that genuinely needs
 * the browser.
 */
export function GlobalDollarPanel({ data }: { data: GlobalDollarData }) {
  const [range, setRange] = useState<RangeKey>('1D');

  return (
    <div className={styles.panel}>
      <CurrencyTicker currencies={data.currencies} />

      <div className={styles.chartArea}>
        <GlobalDollarChart series={data.series[range]} range={range} isLive={data.isLive} />
        <TimeRangeSelector value={range} onChange={setRange} />
      </div>
    </div>
  );
}
