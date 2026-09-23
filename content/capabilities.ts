/** The six core capabilities (spec section 5). */

export type CapabilityIcon =
  | 'move'
  | 'manage'
  | 'exchange'
  | 'allocate'
  | 'intelligence'
  | 'protect';

export interface Capability {
  id: CapabilityIcon;
  label: string;
  description: string;
}

export const CAPABILITIES: Capability[] = [
  { id: 'move', label: 'Move', description: 'Move money across accounts, currencies, and borders.' },
  { id: 'manage', label: 'Manage', description: 'See your entire financial life in one intelligent view.' },
  { id: 'exchange', label: 'Exchange', description: 'Exchange currencies with transparent pricing.' },
  { id: 'allocate', label: 'Allocate', description: 'Allocate capital with clarity and confidence.' },
  {
    id: 'intelligence',
    label: 'Intelligence',
    description: 'AI financial intelligence built to continuously learn and improve.',
  },
  { id: 'protect', label: 'Protect', description: 'Enterprise-grade security. Your data, your control.' },
];
