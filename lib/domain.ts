/**
 * Domain models for the Bank system.
 *
 * The system spec is explicit: "Do not hard-code displayed balances, exchange
 * rates, charts, or performance figures." Components therefore accept these
 * types and never embed a figure; `lib/bankData.ts` is the single seam a
 * production implementation replaces.
 */

export interface Money {
  amount: number;
  currency: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: Money;
}

/**
 * Capital, modelled so the parts always reconcile to the total.
 *
 *     total = cash + invested
 *     reserve is a SUBSET of cash, not a third bucket
 *
 * The reference design shows a total of $42,680.24 beside balances of
 * $18,400 / $24,280 / $12,804. Read as three separate buckets those sum to
 * $55,484 and the total is wrong; read with reserve inside cash they resolve
 * exactly (18,400 + 24,280 = 42,680). The second reading is also how Bank
 * actually holds a reserve, so it is the one modelled here — and `total` is
 * derived rather than stored, so it cannot drift.
 */
export interface CapitalSummary {
  total: Money;
  cash: Money;
  invested: Money;
  reserve: Money;
}

/** Build a summary whose total is guaranteed to equal cash + invested. */
export function capitalOf(cash: number, invested: number, reserve: number): CapitalSummary {
  if (reserve > cash) {
    throw new Error('Reserve is held inside cash and cannot exceed it');
  }
  return {
    total: { amount: Number((cash + invested).toFixed(2)), currency: 'USD' },
    cash: { amount: cash, currency: 'USD' },
    invested: { amount: invested, currency: 'USD' },
    reserve: { amount: reserve, currency: 'USD' },
  };
}

export interface MarketRate {
  symbol: string;
  value: number;
  changePct: number;
}

export interface AlphaStatus {
  mode: 'paper' | 'live';
  status: 'nominal' | 'degraded' | 'critical';
  marketRegime: string;
  investedPct: number;
  reservePct: number;
}

export interface Activity {
  id: string;
  label: string;
  detail: string;
  amount: Money;
}

export interface Goal {
  id: string;
  label: string;
  saved: Money;
  target: Money;
}

export interface SpendCategory {
  label: string;
  share: number;
}

export interface Position {
  symbol: string;
  name: string;
  weight: number;
  changePct: number;
}

export interface AlphaDecision {
  id: string;
  action: 'BUY' | 'HOLD' | 'SELL' | 'NO_TRADE';
  symbol: string;
  reason: string;
}

export interface SeriesPoint {
  t: number;
  v: number;
}

/**
 * Format money for display.
 *
 * Rendered through `Intl.NumberFormat` with an explicit locale rather than the
 * runtime default, so the server and client produce identical strings. A
 * locale-dependent format would hydrate mismatched.
 */
export function formatMoney(money: Money, options: { compact?: boolean; cents?: boolean } = {}): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currency,
    notation: options.compact ? 'compact' : 'standard',
    minimumFractionDigits: options.cents ? 2 : 0,
    maximumFractionDigits: options.cents ? 2 : 0,
  }).format(money.amount);
}

export function usd(amount: number): Money {
  return { amount, currency: 'USD' };
}
