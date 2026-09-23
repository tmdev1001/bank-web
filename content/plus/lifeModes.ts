/** "Designed for every part of your life" (spec section 6). */

import type { IconName } from '@/components/ui/Icon';

export interface LifeMode {
  id: 'personal' | 'business' | 'family' | 'travel';
  icon: IconName;
  label: string;
  headline: string;
  features: string[];
  href: string;
}

export const LIFE_MODES: LifeMode[] = [
  {
    id: 'personal',
    icon: 'manage',
    label: 'Personal',
    headline: 'Manage your money your way.',
    features: ['Accounts', 'Cards', 'Investing', 'Spending Insights'],
    href: '/personal',
  },
  {
    id: 'business',
    icon: 'allocate',
    label: 'Business',
    headline: 'Move your operating capital with confidence.',
    features: ['Business Accounts', 'Payments', 'Cash Flow Tools', 'Team Access'],
    href: '/business',
  },
  {
    id: 'family',
    icon: 'family',
    label: 'Family',
    headline: 'Build your future together.',
    features: ['Shared Goals', 'Permissions', 'Family Overview', 'Allowance Tools'],
    href: '/family',
  },
  {
    id: 'travel',
    icon: 'globe',
    label: 'Travel',
    headline: 'Take your money anywhere.',
    features: ['Multi-Currency Wallet', 'Travel Insights', 'No Hidden Fees', 'Global Access'],
    href: '/travel',
  },
];
