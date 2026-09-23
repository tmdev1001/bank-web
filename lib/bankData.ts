/**
 * The Bank data seam.
 *
 * Every figure the site displays is resolved through this module. Components
 * take domain types as props and embed nothing, so connecting production
 * systems means implementing these functions — not touching the UI.
 *
 * EVERYTHING HERE IS REFERENCE DATA FOR LAYOUT. It is not account data, not
 * market data, and must never be presented as either. `isLive` travels with
 * each payload so a surface can state what it is showing; a figure rendered
 * without provenance on a bank site reads as a real balance or a quote.
 */

import type {
  Account,
  Activity,
  AlphaDecision,
  AlphaStatus,
  CapitalSummary,
  Goal,
  MarketRate,
  Position,
  SpendCategory,
} from './domain';
import { capitalOf, usd } from './domain';

export interface Sourced<T> {
  data: T;
  isLive: boolean;
  source: string;
}

const REFERENCE = 'Reference data for layout — not live account or market data';

function reference<T>(data: T): Sourced<T> {
  return { data, isLive: false, source: REFERENCE };
}

/**
 * Deterministic pseudo-random walk. Seeded so server and client render the
 * same markup — Math.random() would hydrate mismatched — and explicitly not a
 * price series.
 */
export function referenceSeries(seed: number, points: number, drift = 0): number[] {
  const out: number[] = [];
  let value = 0.42;
  let state = seed;
  for (let i = 0; i < points; i += 1) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const step = (state / 2147483648 - 0.48) * 0.16 + drift;
    value = Math.min(0.96, Math.max(0.04, value + step));
    out.push(value);
  }
  return out;
}

export type Persona = 'personal' | 'business' | 'family' | 'travel' | 'invest';

/* --- Capital -------------------------------------------------------------- */

export async function getCapital(persona: Persona = 'personal'): Promise<Sourced<CapitalSummary>> {
  // cash, invested, reserve — the total is derived (see capitalOf).
  const byPersona: Record<Persona, CapitalSummary> = {
    personal: capitalOf(18400, 24280, 12804),
    business: capitalOf(100750, 24680.2, 20700),
    family: capitalOf(31200, 41230.12, 14800),
    travel: capitalOf(6420.5, 2000, 1200),
    invest: capitalOf(12804, 29876.24, 12804),
  };
  return reference(byPersona[persona]);
}

export async function getAccounts(
  persona: 'personal' | 'business' | 'family' | 'travel' = 'personal',
): Promise<Sourced<Account[]>> {
  const byPersona: Record<string, Account[]> = {
    personal: [
      { id: 'checking', name: 'Everyday', type: 'Checking', balance: usd(9420.18) },
      { id: 'savings', name: 'Savings', type: 'Savings', balance: usd(8980.06) },
      { id: 'brokerage', name: 'Investing', type: 'Brokerage', balance: usd(24280) },
    ],
    business: [
      { id: 'operating', name: 'Operating Account', type: 'Business Checking', balance: usd(88430) },
      { id: 'payroll', name: 'Payroll', type: 'Reserved', balance: usd(12300) },
      { id: 'tax', name: 'Tax Reserve', type: 'Reserved', balance: usd(8400) },
      { id: 'intl', name: 'International', type: 'Multi-currency', balance: usd(24680.2) },
    ],
    family: [
      { id: 'shared', name: 'Shared Account', type: 'Joint', balance: usd(31200) },
      { id: 'allowance', name: 'Allowances', type: 'Managed', balance: usd(1200) },
      { id: 'invest', name: 'Family Investing', type: 'Brokerage', balance: usd(41230.12) },
    ],
    travel: [
      { id: 'wallet', name: 'Travel Wallet', type: 'Multi-currency', balance: usd(6420.5) },
      { id: 'card', name: 'Travel Card', type: 'Card', balance: usd(1200) },
    ],
  };
  return reference(byPersona[persona]);
}

export async function getActivity(): Promise<Sourced<Activity[]>> {
  return reference([
    { id: '1', label: 'Apple', detail: 'Subscriptions', amount: usd(-99) },
    { id: '2', label: 'Salary', detail: 'Deposit', amount: usd(2500) },
    { id: '3', label: 'Spotify', detail: 'Subscriptions', amount: usd(-11.99) },
    { id: '4', label: 'Global Dollar Exchange', detail: 'USD to EUR', amount: usd(-250) },
    { id: '5', label: 'Starbucks', detail: 'Food and drink', amount: usd(-6.5) },
  ]);
}

export async function getSpending(): Promise<
  Sourced<{ total: ReturnType<typeof usd>; categories: SpendCategory[] }>
> {
  return reference({
    total: usd(2480),
    categories: [
      { label: 'Housing', share: 0.32 },
      { label: 'Food', share: 0.18 },
      { label: 'Travel', share: 0.12 },
      { label: 'Shopping', share: 0.12 },
      { label: 'Other', share: 0.26 },
    ],
  });
}

export async function getGoals(persona: 'personal' | 'family' = 'personal'): Promise<Sourced<Goal[]>> {
  const rows: Goal[] =
    persona === 'family'
      ? [
          { id: 'home', label: 'Home', saved: usd(34800), target: usd(350000) },
          { id: 'education', label: 'Education', saved: usd(12400), target: usd(25000) },
          { id: 'travel', label: 'Travel', saved: usd(4200), target: usd(10000) },
          { id: 'emergency', label: 'Emergency', saved: usd(6000), target: usd(15000) },
        ]
      : [
          { id: 'home', label: 'Home', saved: usd(34800), target: usd(350000) },
          { id: 'travel', label: 'Travel', saved: usd(4300), target: usd(6000) },
          { id: 'education', label: 'Education', saved: usd(12400), target: usd(25000) },
        ];
  return reference(rows);
}

/* --- Markets -------------------------------------------------------------- */

export async function getRates(): Promise<Sourced<MarketRate[]>> {
  return reference([
    { symbol: 'USD', value: 1.0, changePct: 0 },
    { symbol: 'EUR', value: 0.86, changePct: 0.24 },
    { symbol: 'GBP', value: 0.74, changePct: 0.18 },
    { symbol: 'JPY', value: 148.2, changePct: -0.12 },
    { symbol: 'AUD', value: 1.52, changePct: 0.35 },
    { symbol: 'CAD', value: 1.36, changePct: 0.21 },
  ]);
}

/* --- Alpha ---------------------------------------------------------------- */

export async function getAlphaStatus(): Promise<Sourced<AlphaStatus>> {
  return reference({
    mode: 'paper',
    status: 'nominal',
    marketRegime: 'Bull',
    investedPct: 0.7,
    reservePct: 0.3,
  });
}

export async function getPositions(): Promise<Sourced<Position[]>> {
  return reference([
    { symbol: 'NVDA', name: 'NVIDIA', weight: 0.18, changePct: 0.4 },
    { symbol: 'AAPL', name: 'Apple', weight: 0.16, changePct: 0.7 },
    { symbol: 'MSFT', name: 'Microsoft', weight: 0.15, changePct: 0.2 },
    { symbol: 'AMZN', name: 'Amazon', weight: 0.12, changePct: -0.4 },
    { symbol: 'ARKX', name: 'Space Exploration', weight: 0.05, changePct: 0.33 },
  ]);
}

export async function getAlphaDecisions(): Promise<Sourced<AlphaDecision[]>> {
  return reference([
    { id: '1', action: 'NO_TRADE', symbol: 'AAPL', reason: 'Reward/risk below the 1.5 minimum' },
    { id: '2', action: 'HOLD', symbol: 'MSFT', reason: 'Within stop distance; capital stays committed' },
    { id: '3', action: 'BUY', symbol: 'XLF', reason: 'Persistent strength, risk-adjusted confirmation' },
    { id: '4', action: 'NO_TRADE', symbol: 'META', reason: 'Composite score below the minimum' },
    { id: '5', action: 'SELL', symbol: 'AMZN', reason: 'Stop exit — capital preservation' },
  ]);
}
