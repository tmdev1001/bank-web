/**
 * Bank system navigation.
 *
 * Alpha sits under Invest and keeps its own name and route. It is a distinct
 * product living inside Bank, never "Bank Alpha".
 */

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Personal', href: '/personal' },
  { label: 'Business', href: '/business' },
  { label: 'Family', href: '/family' },
  { label: 'Travel', href: '/travel' },
  {
    label: 'Invest',
    href: '/invest',
    children: [
      { label: 'Portfolio', href: '/invest#portfolio' },
      { label: 'Markets', href: '/invest#markets' },
      { label: 'Alpha', href: '/invest/alpha' },
    ],
  },
  { label: 'Global Dollar', href: '/global-dollar' },
  { label: 'Ventures', href: '/ventures' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Guides', href: '/resources#guides' },
      { label: 'Help Center', href: '/resources#help' },
      { label: 'Developers', href: '/resources#developers' },
      { label: 'API', href: '/resources#api' },
      { label: 'Status', href: '/resources#status' },
    ],
  },
  { label: 'Company', href: '/company' },
  { label: 'Pricing', href: '/pricing' },
];

export const AUTH_NAV = {
  login: { label: 'Log in', href: '/login' },
  signup: { label: 'Get Started', href: '/signup' },
};

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Personal', href: '/personal' },
      { label: 'Business', href: '/business' },
      { label: 'Family', href: '/family' },
      { label: 'Travel', href: '/travel' },
      { label: 'Invest', href: '/invest' },
      { label: 'Bank Plus', href: '/plus' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/company' },
      { label: 'Careers', href: '/company#careers' },
      { label: 'Newsroom', href: '/company#newsroom' },
      { label: 'Partners', href: '/company#partners' },
      { label: 'Ventures', href: '/ventures' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/resources#help' },
      { label: 'Developers', href: '/resources#developers' },
      { label: 'API', href: '/resources#api' },
      { label: 'Status', href: '/resources#status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Compliance', href: '/legal/compliance' },
    ],
  },
];

export type SocialId = 'x' | 'linkedin' | 'instagram' | 'youtube';

export const SOCIAL_LINKS: { id: SocialId; label: string; href: string }[] = [
  { id: 'x', label: 'Bank on X', href: 'https://x.com' },
  { id: 'linkedin', label: 'Bank on LinkedIn', href: 'https://linkedin.com' },
  { id: 'instagram', label: 'Bank on Instagram', href: 'https://instagram.com' },
  { id: 'youtube', label: 'Bank on YouTube', href: 'https://youtube.com' },
];
