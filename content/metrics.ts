/**
 * Trust metrics (spec section 9).
 *
 * THE SPEC IS EXPLICIT: "These figures in the mockup should be treated as
 * placeholder content until substantiated. Do not publish unverified
 * operating metrics."
 *
 * So the unverified state is structural, not a comment someone can miss.
 * Each figure carries its own `verified` flag, and `TrustMetrics` renders a
 * visible qualifier for as long as any figure is unverified. Publishing a
 * claim like "500K+ Users" as plain fact is a legal and reputational
 * exposure, not a design detail.
 *
 * TO GO LIVE: substantiate each figure, set its `verified` flag to true, and
 * the qualifier disappears on its own. Do not flip the flags without the
 * underlying numbers.
 */

export interface TrustMetric {
  value: string;
  label: string;
  /** True only once the figure is substantiated and cleared for publication. */
  verified: boolean;
}

export const TRUST_METRICS: TrustMetric[] = [
  { value: '50+', label: 'Countries', verified: false },
  { value: '20+', label: 'Currencies', verified: false },
  { value: '500K+', label: 'Users', verified: false },
  { value: '$10B+', label: 'Capital moved', verified: false },
];

/** True only when every published figure has been substantiated. */
export const ALL_METRICS_VERIFIED = TRUST_METRICS.every((m) => m.verified);
