/**
 * Illustrative product figures, shared by the phone render and the feature
 * cards so the two never contradict each other on screen.
 *
 * NOT account data and NOT market data. Nothing here is wired to
 * `lib/marketData`.
 *
 * KNOWN DISCREPANCY IN THE REFERENCE: the design shows Total Capital as
 * $42,680.24 while the three balances beneath it sum to $55,484. Both figures
 * are reproduced as supplied rather than silently corrected — they are the
 * numbers the client reviewed — but the donut's shares are COMPUTED from the
 * balances instead of being hard-coded, so the chart itself always totals
 * 100%. Worth resolving with the designer before launch.
 */

export const TOTAL_CAPITAL = '$42,680.24';
export const DAILY_MOVEMENT = { amount: '+$1,284.32', percent: '+3.1%', period: 'Today' };

export interface Allocation {
  label: string;
  amount: number;
  display: string;
}

export const ALLOCATIONS: Allocation[] = [
  { label: 'Cash', amount: 18400, display: '$18,400' },
  { label: 'Invested', amount: 24280, display: '$24,280' },
  { label: 'Reserve', amount: 12804, display: '$12,804' },
];

/** Shares derived from the balances, so they always sum to 100%. */
export function allocationShares(): { label: string; share: number }[] {
  const total = ALLOCATIONS.reduce((sum, a) => sum + a.amount, 0);
  return ALLOCATIONS.map((a) => ({ label: a.label, share: a.amount / total }));
}

export const GOALS = [
  { label: 'Home', saved: 34800, target: 350000, display: '$34,800 / $350,000' },
  { label: 'Travel', saved: 4300, target: 6000, display: '$4,300 / $6,000' },
  { label: 'Education', saved: 12400, target: 25000, display: '$12,400 / $25,000' },
];
