/**
 * Alpha (spec section 7).
 *
 * NAMING IS A HARD CONSTRAINT: "Alpha remains Alpha ... Do not rename it Bank
 * Alpha." Bank owns the financial relationship and infrastructure; Alpha
 * operates the portfolio intelligence system inside it. Nothing here should
 * describe Alpha as a Bank sub-brand.
 */

export const ALPHA = {
  name: 'Alpha',
  expansion: 'Autonomous Learning & Portfolio Handling Architecture',
  headline: 'Autonomous portfolio intelligence built into Bank.',
  route: '/invest/alpha',
  /**
   * The full nine-stage pipeline. Note this is longer than the six stages the
   * BANK homepage shows: Risk Check and Authorize are separate, independent
   * stages, and Measure precedes Learn. Intelligence never authorizes its own
   * risk, so collapsing those two would misrepresent the architecture.
   */
  stages: [
    'Observe',
    'Analyze',
    'Decide',
    'Risk Check',
    'Authorize',
    'Execute',
    'Reconcile',
    'Measure',
    'Learn',
  ],
} as const;

export const INVEST_LINKS = [
  { label: 'Portfolio', href: '/invest/portfolio' },
  { label: 'Markets', href: '/invest/markets' },
  { label: 'Positions', href: '/invest/positions' },
  { label: 'Performance', href: '/invest/performance' },
];
