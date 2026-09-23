/** Hero value propositions (spec section 4). */

import type { IconName } from '@/components/ui/Icon';

export interface HeroBenefit {
  icon: IconName;
  label: string;
  description: string;
}

export const HERO_BENEFITS: HeroBenefit[] = [
  { icon: 'observe', label: 'One System', description: 'Personal. Business. Family. Travel.' },
  { icon: 'globe', label: 'Global Access', description: 'Move money across borders and currencies.' },
  { icon: 'intelligence', label: 'AI Intelligence', description: 'Real-time insights that help you act with clarity.' },
  { icon: 'protect', label: 'Bank-Grade Security', description: 'Built with enterprise-grade security and privacy.' },
];
