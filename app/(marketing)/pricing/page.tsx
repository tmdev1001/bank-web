import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FAQS, PRICING_APPROVED } from '@/content/pricing';
import { PricingTable } from './PricingTable';
import styles from './pricing.module.css';

export const metadata: Metadata = {
  title: 'Pricing — Bank',
  description: 'Simple pricing for a global life. Choose the right plan for you.',
};

export default function PricingPage() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className={`container ${styles.hero}`} aria-labelledby="pricing-heading">
          <h1 id="pricing-heading" className={styles.headline}>
            Simple pricing
            <br />
            for a global life.
          </h1>
          <p className={styles.copy}>Choose the right plan for you.</p>
        </section>

        <section className={`container ${styles.plansSection}`} aria-label="Plans">
          <PricingTable />
          {!PRICING_APPROVED && (
            <p className={styles.notice}>
              Pricing shown is indicative and pending commercial approval.
            </p>
          )}
        </section>

        <section className={`container ${styles.faqSection}`} aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={styles.faqHeading}>
            Supporting FAQs:
          </h2>
          {/* Native disclosure: keyboard accessible and announces its expanded
              state without JavaScript. Safe here because, unlike the footer
              columns, these are MEANT to start collapsed at every width. */}
          <ul className={styles.faqs}>
            {FAQS.map((faq) => (
              <li key={faq.q}>
                <details className={styles.faq}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
