'use client';

import { useState } from 'react';
import { MarketChart } from '@/components/finance/MarketChart';
import { Tabs } from '@/components/ui/Tabs';
import styles from './global-dollar.module.css';

const RANGES = ['1D', '1W', '1M', '3M', '1Y'] as const;
type Range = (typeof RANGES)[number];

const WORDS: Record<Range, string> = {
  '1D': 'the past day',
  '1W': 'the past week',
  '1M': 'the past month',
  '3M': 'the past three months',
  '1Y': 'the past year',
};

/**
 * The only client component on this page — range selection is the one thing
 * that genuinely needs the browser. Everything else renders on the server.
 */
export function RangeChart({ series }: { series: Record<Range, number[]> }) {
  const [range, setRange] = useState<Range>('1D');

  return (
    <div className={styles.rangeChart}>
      <MarketChart
        series={series[range]}
        label={`Global Dollar reference over ${WORDS[range]}`}
      />
      <div className={styles.ranges}>
        <Tabs
          items={[...RANGES]}
          label="Chart time range"
          onChange={(value) => setRange(value as Range)}
        />
      </div>
    </div>
  );
}
