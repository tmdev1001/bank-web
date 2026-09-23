import Link from 'next/link';
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@/content/navigation';
import { Icon } from '@/components/ui/Icon';
import styles from './Footer.module.css';

/**
 * The shared Bank footer.
 *
 * Plain columns at every width. Collapsible <details> was tried and rejected:
 * browsers hide closed content through UA internals (Chrome via
 * ::details-content) that no author selector can reliably re-open, which
 * silently rendered the desktop columns as bare headings.
 *
 * `dark` is per-page, as the spec allows.
 */
export function Footer({ plus = false }: { plus?: boolean }) {
  return (
    <footer className={`${styles.footer} onDark`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.lockup}>
            <span className="wordmark">Bank</span>
            {plus && <span className={styles.badge}>Plus</span>}
          </span>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Bank, Inc.
            <br />
            All rights reserved.
          </p>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className={styles.column}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Follow Us</h2>
            <ul className={styles.social}>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Icon name={social.id} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
}
