'use client';

import { useState } from 'react';
import styles from './auth.module.css';

interface Errors {
  email?: string;
  password?: string;
}

/**
 * Shared auth form.
 *
 * Validation is deliberately text-first (spec: "form validation must provide
 * text errors"). Each message is tied to its input with `aria-describedby`,
 * the input is marked `aria-invalid`, and the summary is a live region so a
 * screen reader hears the failure without hunting for it. Colour is a
 * secondary cue, never the carrier.
 */
export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');

    const next: Errors = {};
    if (!email) next.email = 'Enter your email address.';
    else if (!email.includes('@') || !email.includes('.')) {
      next.email = 'Enter a valid email address, for example name@example.com.';
    }
    if (!password) next.password = 'Enter your password.';
    else if (mode === 'signup' && password.length < 8) {
      next.password = 'Use at least 8 characters.';
    }

    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  };

  const count = Object.keys(errors).length;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {/* Live region: announced on change without moving focus. */}
      <div aria-live="polite" className={styles.status}>
        {count > 0 && (
          <p className={styles.summary}>
            {count === 1 ? 'There is 1 problem with this form.' : `There are ${count} problems with this form.`}
          </p>
        )}
        {submitted && <p className={styles.success}>Details look good. Connect this form to authentication.</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={styles.input}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className={styles.error}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          className={styles.input}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? 'password-error' : 'password-hint'}
        />
        {mode === 'signup' && !errors.password && (
          <p id="password-hint" className={styles.hint}>
            Use at least 8 characters.
          </p>
        )}
        {errors.password && (
          <p id="password-error" className={styles.error}>
            {errors.password}
          </p>
        )}
      </div>

      <button type="submit" className="btn btnPrimary">
        {mode === 'signup' ? 'Create account' : 'Log in'}
      </button>
    </form>
  );
}
