'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PLANS } from '@/content/pricing';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import styles from './pricing.module.css';

/**
 * Plan cards with the billing toggle.
 *
 * Prices are computed from config, never written into the markup, so a change
 * to `content/pricing.ts` is the only edit needed. The annual figure is
 * derived from the monthly price and the configured discount rather than
 * stored separately — two stored numbers drift.
 */
export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  const priceFor = (plan: (typeof PLANS)[number]) => {
    if (plan.monthly === null) return plan.priceLabel ?? 'Custom';
    if (plan.monthly === 0) return plan.priceLabel ?? 'Free';
    const value = annual ? plan.monthly * (1 - plan.annualDiscount) : plan.monthly;
    return `$${value.toFixed(2)}`;
  };

  return (
    <>
      <div className={styles.toggle}>
        <Tabs
          items={['Monthly', 'Yearly (Save 20%)']}
          label="Billing period"
          onChange={(value) => setAnnual(value.startsWith('Yearly'))}
        />
      </div>

      <ul className={styles.plans}>
        {PLANS.map((plan) => (
          <li key={plan.id} className={styles.plan} data-featured={plan.featured}>
            <div className={styles.planHead}>
              <h2 className={styles.planName}>{plan.name}</h2>
              {plan.featured && <Badge tone="dark">Most popular</Badge>}
            </div>

            <p className={styles.planPrice}>
              <span className="tabular">{priceFor(plan)}</span>
              {plan.monthly !== null && plan.monthly > 0 && (
                <span className={styles.planPeriod}>/mo</span>
              )}
            </p>
            {plan.monthly !== null && plan.monthly > 0 && annual && (
              <p className={styles.planNote}>Billed yearly</p>
            )}

            <p className={styles.planTagline}>{plan.tagline}</p>

            <ul className={styles.features}>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span className={styles.tick} aria-hidden="true">
                    &#10003;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={plan.cta.href}
              className={`btn ${plan.featured ? 'btnPrimary' : 'btnSecondary'} ${styles.planCta}`}
            >
              {plan.cta.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
