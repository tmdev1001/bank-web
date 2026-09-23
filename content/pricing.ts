/**
 * Pricing configuration.
 *
 * THE SPEC CONDITIONS THESE FIGURES: "Use those only if they are approved
 * commercial prices. Otherwise keep all prices config-driven."
 *
 * So the prices live here as config with an `approved` flag, and the page
 * states that pricing is indicative while any plan is unapproved. A published
 * price is a commercial commitment; shipping one that has not been signed off
 * is the kind of error that is expensive to walk back.
 */

export interface Plan {
  id: 'bank' | 'plus' | 'business';
  name: string;
  tagline: string;
  /** Monthly price in USD, or null for "Custom" / "Free". */
  monthly: number | null;
  /** Display override when there is no numeric price. */
  priceLabel?: string;
  /** Discount applied on annual billing, as a fraction. */
  annualDiscount: number;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  /** False until commercial sign-off. Drives the indicative-pricing notice. */
  approved: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'bank',
    name: 'Bank',
    tagline: 'Essential tools to move and manage your money.',
    monthly: 0,
    priceLabel: 'Free',
    annualDiscount: 0,
    features: ['Accounts', 'Global Dollar', 'Basic transfers', 'Mobile app'],
    cta: { label: 'Get Started', href: '/signup' },
    approved: false,
  },
  {
    id: 'plus',
    name: 'Bank Plus',
    tagline: 'Everything you need, in one place.',
    monthly: 9.99,
    annualDiscount: 0.2,
    features: [
      'All personal features',
      'Multi-currency wallet',
      'Alpha access',
      'Travel benefits',
      'Priority support',
    ],
    cta: { label: 'Get Bank Plus', href: '/plus' },
    featured: true,
    approved: false,
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Built for teams and growing companies.',
    monthly: null,
    priceLabel: 'Custom',
    annualDiscount: 0,
    features: ['Business accounts', 'Payments and invoicing', 'Team access', 'Advanced controls', 'Dedicated support'],
    cta: { label: 'Contact Sales', href: '/company' },
    approved: false,
  },
];

export const PRICING_APPROVED = PLANS.every((plan) => plan.approved);

export const FAQS = [
  {
    q: 'Can I change plans later?',
    a: 'Yes. You can move between plans at any time, and changes take effect from your next billing period.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Bank is free to start. Bank Plus can be trialled before your first charge.',
  },
  {
    q: 'What is included in Bank Plus?',
    a: 'Bank Plus connects capital, currencies, money movement, insights and goals into one financial operating system, including Alpha access inside Invest.',
  },
  {
    q: 'Do you offer business pricing?',
    a: 'Business pricing is tailored to your operations and volume. Contact sales for a quote.',
  },
];
