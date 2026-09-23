'use client';

import { useState } from 'react';
import { STAGES } from '@/content/ventures';
import styles from './ventures.module.css';

type FieldName = 'founder' | 'company' | 'website' | 'stage' | 'description';
type Errors = Partial<Record<FieldName, string>>;

/**
 * The founder submission form.
 *
 * Validation follows the same rules as the auth form: text errors first,
 * each tied to its input with `aria-describedby`, the input marked
 * `aria-invalid`, and a live-region summary so the failure is announced
 * rather than only coloured. Colour is never the carrier.
 *
 * NOTHING IS SENT. There is no Ventures intake to send it to, and a founder
 * uploading a deck into a void would be worse than no form at all — so the
 * success state says so in plain words. Wiring it up is a server action and a
 * destination for the file; no field here would need to change.
 */
export function PitchForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? '').trim();

    const founder = value('founder');
    const company = value('company');
    const website = value('website');
    const stage = value('stage');
    const description = value('description');

    const next: Errors = {};
    if (!founder) next.founder = 'Enter your name.';
    if (!company) next.company = 'Enter the company name.';
    if (!website) next.website = 'Enter the company website.';
    // Deliberately permissive: founders paste bank.com, www.bank.com and
    // https://bank.com interchangeably, and all three are answerable. Only a
    // string that cannot be a domain at all is rejected.
    else if (!/^(https?:\/\/)?[^\s/]+\.[^\s/]{2,}/i.test(website)) {
      next.website = 'Enter a valid website, for example bank.com.';
    }
    if (!stage) next.stage = 'Select the stage you are raising at.';
    if (!description) next.description = 'Tell us what you are building.';
    else if (description.length < 20) {
      next.description = 'Add a little more — a sentence or two is enough.';
    }

    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  };

  const count = Object.keys(errors).length;
  const describedBy = (field: FieldName, hint?: string) =>
    errors[field] ? `${field}-error` : hint;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div aria-live="polite" className={styles.status}>
        {count > 0 && (
          <p className={styles.summary}>
            {count === 1
              ? 'There is 1 problem with this form.'
              : `There are ${count} problems with this form.`}
          </p>
        )}
        {submitted && (
          <p className={styles.success}>
            Details look complete. This form is not connected to the Ventures intake yet, so
            nothing has been sent.
          </p>
        )}
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="founder" className={styles.label}>
            Founder name
          </label>
          <input
            id="founder"
            name="founder"
            type="text"
            autoComplete="name"
            className={styles.input}
            aria-invalid={errors.founder ? true : undefined}
            aria-describedby={describedBy('founder')}
          />
          {errors.founder && (
            <p id="founder-error" className={styles.error}>
              {errors.founder}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="company" className={styles.label}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={styles.input}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy('company')}
          />
          {errors.company && (
            <p id="company-error" className={styles.error}>
              {errors.company}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="website" className={styles.label}>
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="bank.com"
            className={styles.input}
            aria-invalid={errors.website ? true : undefined}
            aria-describedby={describedBy('website')}
          />
          {errors.website && (
            <p id="website-error" className={styles.error}>
              {errors.website}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="stage" className={styles.label}>
            Stage
          </label>
          <select
            id="stage"
            name="stage"
            defaultValue=""
            className={styles.input}
            aria-invalid={errors.stage ? true : undefined}
            aria-describedby={describedBy('stage')}
          >
            <option value="">Select a stage</option>
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          {errors.stage && (
            <p id="stage-error" className={styles.error}>
              {errors.stage}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="location" className={styles.label}>
            Location <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="address-level2"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="amount" className={styles.label}>
            Amount raising <span className={styles.optional}>(optional)</span>
          </label>
          {/* Text, not number: founders write "$2M", "€1.5m" and "2,000,000",
              and a number input would reject all three. */}
          <input
            id="amount"
            name="amount"
            type="text"
            placeholder="$2M"
            className={styles.input}
            aria-describedby="amount-hint"
          />
          <p id="amount-hint" className={styles.hint}>
            Any format. Currency included.
          </p>
        </div>

        <div className={`${styles.field} ${styles.fieldWide}`}>
          <label htmlFor="deck" className={styles.label}>
            Deck <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="deck"
            name="deck"
            type="file"
            accept=".pdf,.ppt,.pptx,.key"
            className={styles.file}
            aria-describedby="deck-hint"
          />
          <p id="deck-hint" className={styles.hint}>
            PDF, PowerPoint or Keynote.
          </p>
        </div>

        <div className={`${styles.field} ${styles.fieldWide}`}>
          <label htmlFor="description" className={styles.label}>
            Short description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className={`${styles.input} ${styles.textarea}`}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={describedBy('description', 'description-hint')}
          />
          {errors.description ? (
            <p id="description-error" className={styles.error}>
              {errors.description}
            </p>
          ) : (
            <p id="description-hint" className={styles.hint}>
              What you are building, and why now. A sentence or two.
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="btn btnPrimary">
        Pitch Bank Ventures
      </button>
    </form>
  );
}
