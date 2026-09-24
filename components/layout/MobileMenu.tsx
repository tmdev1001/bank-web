'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AUTH_NAV, PRIMARY_NAV } from '@/content/navigation';
import { Icon } from '@/components/ui/Icon';
import styles from './Header.module.css';

/**
 * Shared mobile menu.
 *
 * A modal surface, so it does what a modal owes a keyboard user: Escape
 * closes, focus moves in on open and returns to the trigger on close, and the
 * background is scroll-locked while open. Sub-navigation (Invest, Resources)
 * renders inline and expanded — an extra tap layer at 375px would bury Alpha,
 * which is the route the architecture is trying to surface.
 */
export function MobileMenu({ plus = false }: { plus?: boolean }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className={styles.mobile}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="bank-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="visuallyHidden">{open ? 'Close menu' : 'Open menu'}</span>
        <Icon name={open ? 'close' : 'menu'} size={22} />
      </button>

      <div
        id="bank-menu"
        ref={panelRef}
        className={styles.panel}
        data-open={open}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav aria-label="Primary">
          <ul className={styles.panelList}>
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.panelLink} onClick={close}>
                  {item.label}
                </Link>
                {item.children && (
                  <ul className={styles.panelSub}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className={styles.panelSubLink} onClick={close}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.panelActions}>
          <Link href={AUTH_NAV.login.href} className="btn btnSecondary" onClick={close}>
            {AUTH_NAV.login.label}
          </Link>
          <Link href={plus ? '/plus/get-started' : AUTH_NAV.signup.href} className="btn btnPrimary" onClick={close}>
            {plus ? 'Get Bank Plus' : AUTH_NAV.signup.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
