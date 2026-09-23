import Link from 'next/link';
import { AUTH_NAV, PRIMARY_NAV } from '@/content/navigation';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.css';

/**
 * The shared Bank header, used by every route.
 *
 * `plus` swaps the wordmark for the BANK [PLUS] lockup and the CTA label.
 * BANK stays the dominant brand in both; PLUS is a product badge, not a second
 * logo. Dropdowns open on hover AND focus-within so sub-navigation is
 * reachable by keyboard.
 */
export function Header({ plus = false }: { plus?: boolean }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href={plus ? '/plus' : '/'} className={styles.lockup} aria-label={plus ? 'Bank Plus — home' : 'Bank — home'}>
          <span className="wordmark">Bank</span>
          {plus && <span className={styles.badge}>Plus</span>}
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {PRIMARY_NAV.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                  {item.children && (
                    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" className={styles.chev}>
                      <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <div className={styles.dropdown}>
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={styles.dropdownLink}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.auth}>
          <Link href={AUTH_NAV.login.href} className={styles.navLink}>
            {AUTH_NAV.login.label}
          </Link>
          <Link href={plus ? '/plus/get-started' : AUTH_NAV.signup.href} className="btn btnPrimary">
            {plus ? 'Get Bank Plus' : AUTH_NAV.signup.label}
          </Link>
        </div>

        <MobileMenu plus={plus} />
      </div>
    </header>
  );
}
