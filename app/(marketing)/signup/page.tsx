import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { AuthForm } from './AuthForm';
import styles from './auth.module.css';

export const metadata: Metadata = {
  title: 'Get Started — Bank',
  description: 'Open a Bank account.',
};

export default function SignupPage() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main" className={`container ${styles.page}`}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Get started</h1>
          <p className={styles.sub}>Open your account in minutes.</p>
          <AuthForm mode="signup" />
          <p className={styles.alt}>
            Already with Bank? <Link href="/login">Log in</Link>
          </p>
        </div>
      </main>
    </>
  );
}
