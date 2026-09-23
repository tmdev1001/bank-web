import { FINANCIAL_LIFE } from '@/content/financialLife';
import { FinancialLifeCard } from './FinancialLifeCard';
import styles from './FinancialLife.module.css';

export function FinancialLife() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="financial-life-heading">
      <h2 id="financial-life-heading" className={`sectionHeading ${styles.heading}`}>
        One financial system for every part of your life.
      </h2>

      <ul className={styles.grid}>
        {FINANCIAL_LIFE.map((item) => (
          <FinancialLifeCard key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
