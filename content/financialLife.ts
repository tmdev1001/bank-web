/** "One financial system for every part of your life" (spec section 6). */

export interface FinancialLifeItem {
  id: 'personal' | 'business' | 'family' | 'travel';
  eyebrow: string;
  headline: string;
  href: string;
  /** Personal and Business show card art; Family and Travel show line art. */
  visual: 'card' | 'family' | 'travel';
}

export const FINANCIAL_LIFE: FinancialLifeItem[] = [
  { id: 'personal', eyebrow: 'Personal', headline: 'Manage your money.', href: '/personal', visual: 'card' },
  { id: 'business', eyebrow: 'Business', headline: 'Move your operating capital.', href: '/business', visual: 'card' },
  { id: 'family', eyebrow: 'Family', headline: 'Build your shared future.', href: '/family', visual: 'family' },
  { id: 'travel', eyebrow: 'Travel', headline: 'Take your money with you.', href: '/travel', visual: 'travel' },
];
