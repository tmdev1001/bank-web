import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/Hero/Hero';
import { CapabilityGrid } from '@/components/CapabilityGrid/CapabilityGrid';
import { FinancialLife } from '@/components/FinancialLife/FinancialLife';
import { GlobalDollar } from '@/components/GlobalDollar/GlobalDollar';
import { Infrastructure } from '@/components/Infrastructure/Infrastructure';
import { TrustMetrics } from '@/components/TrustMetrics';
import { Footer } from '@/components/layout/Footer';

/**
 * BankHome.
 *
 * A composition root and nothing else — every section owns its own content,
 * data and presentation. Source order is the mobile order the spec asks for,
 * so no section needs visual reordering and tab order always follows the
 * visible layout.
 */
export default function BankHome() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <CapabilityGrid />
        <FinancialLife />
        <GlobalDollar />
        <Infrastructure />
        <TrustMetrics />
      </main>
      <Footer />
    </>
  );
}
