/**
 * Trust metrics for Bank Plus (spec section 9).
 *
 * The spec requires these be "CMS/config driven rather than hard-coded", and
 * treated as placeholders "unless Bank has evidence supporting them". So each
 * figure is a config record carrying its own `verified` flag, and the section
 * states their status while any remain unverified. Uptime in particular is a
 * measurable SLA claim and should never ship unsubstantiated.
 */

export interface PlusMetric {
  id: string;
  value: string;
  label: string;
  verified: boolean;
}

export const PLUS_METRICS: PlusMetric[] = [
  { id: 'countries', value: '50+', label: 'Countries', verified: false },
  { id: 'currencies', value: '20+', label: 'Currencies', verified: false },
  { id: 'users', value: '500K+', label: 'Users', verified: false },
  { id: 'capital', value: '$10B+', label: 'Capital Moved', verified: false },
  { id: 'uptime', value: '99.99%', label: 'Uptime', verified: false },
];

export const PLUS_METRICS_VERIFIED = PLUS_METRICS.every((m) => m.verified);
