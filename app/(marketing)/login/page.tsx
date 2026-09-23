import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { AuthForm } from '../signup/AuthForm';
import styles from '../signup/auth.module.css';

export const metadata: Metadata = {
  title: 'Log in — Bank',
  description: 'Log in to Bank.',
};

/**
 * The spec lists /login and /signup in the route architecture but supplies no
 * design for them, so these follow the system rather than invent a look:
 * shared header, one centred card, the same buttons and focus treatment.
 *
 * Validation messages are TEXT, per the accessibility requirement — never a
 * red border alone.
 */
export default function LoginPage() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main" className={`container ${styles.page}`}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Log in</h1>
          <p className={styles.sub}>Welcome back.</p>
          <AuthForm mode="login" />
          <p className={styles.alt}>
            New to Bank? <Link href="/signup">Create an account</Link>
          </p>
        </div>
      </main>
    </>
  );
}
