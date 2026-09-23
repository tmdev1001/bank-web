import type { StaticImageData } from 'next/image';
import type { IconName } from '@/components/ui/Icon';

/**
 * Bank Ventures — the investment arm.
 *
 * Copy lives here rather than in the page for the same reason every other
 * section's does: the route is a composition, not a content store.
 *
 * TWO THINGS ARE DELIBERATELY EMPTY, and both are load-bearing:
 *
 *   • `PORTFOLIO` — the client's instruction is explicit: "Until actual
 *     investments exist, label this section 'Portfolio coming soon' rather
 *     than displaying fictional companies." The grid is built and typed; it
 *     renders the coming-soon state for exactly as long as this array is
 *     empty. Pushing a real company in is the only change needed.
 *
 *   • Fund figures (size, cheque range, portfolio count) are absent
 *     ENTIRELY, not placeheld. `content/metrics.ts` already treats unverified
 *     operating metrics as unpublishable; a fund size is a stronger claim
 *     again. If those figures are supplied and cleared, they belong here with
 *     the same `verified` flag TrustMetrics uses.
 */

export interface FocusArea {
  icon: IconName;
  label: string;
  detail: string;
}

/** What Bank Ventures invests in. */
export const FOCUS_AREAS: FocusArea[] = [
  {
    icon: 'manage',
    label: 'Financial Infrastructure',
    detail: 'Payments, banking infrastructure, identity, compliance and financial APIs.',
  },
  {
    icon: 'exchange',
    label: 'Commerce',
    detail: 'New infrastructure for selling, purchasing, marketplaces and global transactions.',
  },
  {
    icon: 'intelligence',
    label: 'Intelligence',
    detail: 'Financial intelligence, automation, data infrastructure and decision systems.',
  },
  {
    icon: 'globe',
    label: 'Global Money',
    detail: 'Currency, cross-border payments, remittances and new mechanisms for moving value.',
  },
  {
    icon: 'move',
    label: 'Future Platforms',
    detail: 'Technologies capable of becoming foundational layers for new markets.',
  },
];

/**
 * What Bank can bring beyond the cheque.
 *
 * Labels only. Each one would need a specific, committed promise behind it to
 * carry a description, and none has been made — "can support" is the brief's
 * own wording and the page keeps it.
 */
export const SUPPORT: { icon: IconName; label: string }[] = [
  { icon: 'allocate', label: 'Capital' },
  { icon: 'decide', label: 'Product Strategy' },
  { icon: 'manage', label: 'Financial Infrastructure' },
  { icon: 'move', label: 'Distribution' },
  { icon: 'intelligence', label: 'Technology' },
  { icon: 'globe', label: 'Bank Ecosystem' },
];

export interface PortfolioCompany {
  name: string;
  category: string;
  /** One line. What the company does, not what Bank thinks of it. */
  description: string;
  href: string;
  /** The company wordmark. Omitted until one is supplied and cleared for use. */
  logo?: StaticImageData;
}

/** Empty until Bank Ventures has announced investments. See the note above. */
export const PORTFOLIO: PortfolioCompany[] = [];

/** Stages offered in the pitch form, in the order a company passes through them. */
export const STAGES = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Growth', 'Other'] as const;
