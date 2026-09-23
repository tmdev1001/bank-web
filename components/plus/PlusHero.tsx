import Link from 'next/link';
import { HERO_BENEFITS } from '@/content/plus/hero';

import { Icon } from '@/components/ui/Icon';
import { BankPlusPhone } from './BankPlusPhone';
import styles from './PlusHero.module.css';

function HeroContent() {
  return (
    <div className={styles.content}>
      <p className={styles.eyebrow}>Bank Plus</p>
      <h1 id="plus-hero-title" className={styles.title}>
        More than banking.
        <br />
        A financial operating system.
      </h1>
      <p className={styles.lede}>
        Bank Plus connects your money, currencies, investments, and goals with AI-powered
        intelligence that helps you move, manage, and grow your capital&mdash;every day.
      </p>
      <div className={styles.actions}>
        <Link href={'/plus/get-started'} className="btn btnPrimary">
          Get Bank Plus
        </Link>
        <Link href="/plus/features" className="btn btnSecondary">
          Explore Features
        </Link>
      </div>
    </div>
  );
}

function HeroBenefits() {
  return (
    <ul className={styles.benefits}>
      {HERO_BENEFITS.map((benefit) => (
        <li key={benefit.label} className={styles.benefit}>
          <Icon name={benefit.icon} size={22} />
          <h2 className={styles.benefitLabel}>{benefit.label}</h2>
          <p className={styles.benefitCopy}>{benefit.description}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Bank Plus hero.
 *
 * Roughly 55/45 on desktop. Source order already matches the mobile order the
 * spec asks for — eyebrow, headline, copy, CTAs, phone, then value props — so
 * nothing is visually reordered and tab order always follows the layout.
 */
export function PlusHero({ containerClass }: { containerClass: string }) {
  return (
    <section className={styles.hero} aria-labelledby="plus-hero-title">
      <div className={containerClass}>
        <div className={styles.split}>
          <HeroContent />
          <div className={styles.visual}>
            <BankPlusPhone />
          </div>
        </div>
        <HeroBenefits />
      </div>
    </section>
  );
}
