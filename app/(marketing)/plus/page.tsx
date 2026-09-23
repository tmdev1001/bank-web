import type { Metadata } from 'next';
import { getGlobalDollar } from '@/lib/marketData';
import { Header } from '@/components/layout/Header';
import { PlusHero } from '@/components/plus/PlusHero';
import { FeatureOverview } from '@/components/plus/FeatureOverview';
import { LifeModes } from '@/components/plus/LifeModes';
import { InvestAlpha } from '@/components/plus/InvestAlpha';
import { PlusGlobalDollar } from '@/components/plus/PlusGlobalDollar';
import { PlusTrust } from '@/components/plus/PlusTrust';
import { PlusCTA } from '@/components/plus/PlusCTA';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Bank Plus — A financial operating system',
  description:
    'Bank Plus connects your money, currencies, investments, and goals with AI-powered intelligence that helps you move, manage, and grow your capital every day.',
};

/**
 * BankPlusPage.
 *
 * A composition root only. Source order is the mobile order from spec section
 * 12, so nothing is visually reordered and tab order always follows the
 * visible layout.
 *
 * Bank is the platform. Bank Plus is the customer's financial operating
 * system. Alpha is the autonomous portfolio system living inside Bank.
 */
export default async function BankPlusPage() {
  const data = await getGlobalDollar();
  // One shared container across the system.
  const container = 'container';

  return (
    <>
      <a href="#plus-main" className="skipLink">
        Skip to content
      </a>
      <Header plus />
      <main id="plus-main">
        <PlusHero containerClass={container} />
        <FeatureOverview currencies={data.currencies} containerClass={container} />
        <LifeModes containerClass={container} />
        <InvestAlpha containerClass={container} />
        <PlusGlobalDollar containerClass={container} />
        <PlusTrust containerClass={container} />
        <PlusCTA containerClass={container} />
      </main>
      <Footer plus />
    </>
  );
}
