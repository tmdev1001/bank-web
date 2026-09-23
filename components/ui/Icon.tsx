/**
 * Monochrome line-icon set.
 *
 * All icons inherit `currentColor` and are decorative by default
 * (`aria-hidden`), because every one of them sits beside a visible text
 * label. Where an icon IS the only content — the social links — the
 * surrounding link carries the accessible name instead.
 */

export type IconName =
  | 'move'
  | 'manage'
  | 'exchange'
  | 'allocate'
  | 'intelligence'
  | 'protect'
  | 'observe'
  | 'analyze'
  | 'decide'
  | 'execute'
  | 'reconcile'
  | 'learn'
  | 'lock'
  | 'arrowRight'
  | 'menu'
  | 'close'
  | 'family'
  | 'globe'
  | 'bell'
  | 'x'
  | 'linkedin'
  | 'instagram'
  | 'youtube';

const PATHS: Record<IconName, React.ReactNode> = {
  move: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 10.5 12 7l3.5 3.5M12 7v9" />
    </>
  ),
  manage: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14.5h4" />
    </>
  ),
  exchange: (
    <>
      <path d="M4 9h13l-3-3M20 15H7l3 3" />
    </>
  ),
  allocate: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v8h8" />
    </>
  ),
  intelligence: (
    <>
      <path d="M5 19V9M10 19V5M15 19v-7M20 19v-4" />
    </>
  ),
  protect: (
    <>
      <path d="M12 3.5 5 6.5v5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9v-5Z" />
    </>
  ),
  observe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  analyze: (
    <>
      <path d="M3 13h3.5l2.5-6 3 11 2.5-7 1.5 2H21" />
    </>
  ),
  decide: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  execute: (
    <>
      <path d="M4 12h15m-4.5-4.5L19 12l-4.5 4.5" />
    </>
  ),
  reconcile: (
    <>
      <path d="M19 12a7 7 0 1 1-2.2-5.1" />
      <path d="M19.5 4v4h-4" />
    </>
  ),
  learn: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h14m-5-5 5 5-5 5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12M18 6 6 18" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="9" r="2.6" />
      <circle cx="16" cy="9" r="2.6" />
      <path d="M3.5 19c0-2.6 2-4.4 4.5-4.4s4.5 1.8 4.5 4.4M12.5 19c0-2.6 1.6-4.4 3.5-4.4s4.5 1.8 4.5 4.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5c-2.2 2.3-3.4 5.3-3.4 8.5s1.2 6.2 3.4 8.5c2.2-2.3 3.4-5.3 3.4-8.5S14.2 5.8 12 3.5ZM3.6 12h16.8" />
    </>
  ),
  bell: (
    <>
      <path d="M17.5 16.5h-11l1.2-2v-3.8a4.3 4.3 0 0 1 8.6 0V14.5Z" />
      <path d="M10.5 19h3" />
    </>
  ),
  x: (
    <>
      <path d="M5 5l14 14M19 5 5 19" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v6M8 8.2v.1M12 17v-3.4a2 2 0 0 1 4 0V17" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.3v.1" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6.5" width="18" height="11" rx="3" />
      <path d="m10.5 9.8 4.5 2.7-4.5 2.7Z" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ name, size = 24, strokeWidth = 1.4, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
