/**
 * Market-data seam for the Global Dollar section (spec section 7).
 *
 * THE SPEC IS EXPLICIT: "Do not hard-code these reference values as live
 * financial data. Connect the production implementation to the appropriate
 * market-data source."
 *
 * So this module defines the SHAPE the UI consumes and ships a clearly
 * labelled reference snapshot for layout work. The components never embed a
 * rate; they render whatever `getGlobalDollar()` returns. Swapping in a real
 * feed means implementing that one function against the vendor of record —
 * no component changes.
 *
 * `isLive` travels with the data so the UI can state what it is showing. A
 * rate presented without provenance is indistinguishable from a quote, and a
 * marketing page must not imply an executable price.
 */

export type RangeKey = '1D' | '1W' | '1M' | '3M' | '1Y';

export const RANGES: RangeKey[] = ['1D', '1W', '1M', '3M', '1Y'];

export interface CurrencyRate {
  code: string;
  name: string;
  /** Units of this currency per 1 Global Dollar. */
  rate: number;
  /** Fractional change over the selected range, e.g. 0.0024 = +0.24%. */
  change: number;
}

export interface GlobalDollarData {
  reference: number;
  currencies: CurrencyRate[];
  /** Normalized 0..1 series, oldest to newest, for the chart. */
  series: Record<RangeKey, number[]>;
  /** False for the reference snapshot; true only behind a real feed. */
  isLive: boolean;
  /** ISO timestamp of the quote, or null when not live. */
  asOf: string | null;
  /** Human-readable provenance shown beside the figures. */
  source: string;
}

/**
 * Deterministic pseudo-random walk for the reference chart.
 *
 * Seeded so the server and client render identical markup — a Math.random()
 * series would hydrate mismatched. It is explicitly NOT market data; it
 * exists so the chart has a realistic shape at every breakpoint.
 */
function referenceSeries(seed: number, points: number): number[] {
  const out: number[] = [];
  let value = 0.42;
  let state = seed;
  for (let i = 0; i < points; i += 1) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const step = (state / 2147483648 - 0.48) * 0.16;
    value = Math.min(0.96, Math.max(0.04, value + step));
    out.push(value);
  }
  return out;
}

/** Layout-only snapshot. Never present this as a quote. */
const REFERENCE_SNAPSHOT: GlobalDollarData = {
  reference: 1.0,
  currencies: [
    { code: 'USD', name: 'US Dollar', rate: 1.0, change: 0 },
    { code: 'EUR', name: 'Euro', rate: 0.86, change: 0.0024 },
    { code: 'GBP', name: 'British Pound', rate: 0.74, change: 0.0018 },
    { code: 'JPY', name: 'Japanese Yen', rate: 148.2, change: -0.0012 },
    { code: 'AUD', name: 'Australian Dollar', rate: 1.52, change: 0.0035 },
    { code: 'CAD', name: 'Canadian Dollar', rate: 1.36, change: 0.0021 },
  ],
  series: {
    '1D': referenceSeries(7, 48),
    '1W': referenceSeries(13, 56),
    '1M': referenceSeries(29, 64),
    '3M': referenceSeries(53, 72),
    '1Y': referenceSeries(97, 88),
  },
  isLive: false,
  asOf: null,
  source: 'Reference snapshot for layout — not live market data',
};

/**
 * Resolve Global Dollar data.
 *
 * PRODUCTION: replace the body with a call to the market-data provider of
 * record, returning `isLive: true` and a real `asOf`. Keep it async and keep
 * the return shape; the components already handle both states.
 */
export async function getGlobalDollar(): Promise<GlobalDollarData> {
  return REFERENCE_SNAPSHOT;
}
