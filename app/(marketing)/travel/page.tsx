import type { Metadata } from 'next';
import { MEDIA } from '@/content/media';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FunctionRow, ModuleSection, ProductCTA, ProductHero } from '@/components/product/ProductPage';
import { CapitalOverview } from '@/components/finance/CapitalOverview';
import { CurrencyTicker } from '@/components/finance/CurrencyTicker';
import { Card, CardHeader } from '@/components/ui/Card';
import { getCapital, getRates } from '@/lib/bankData';
import styles from './travel.module.css';

export const metadata: Metadata = {
  title: 'Travel — Bank',
  description: 'Bank Travel gives you global access, local freedom, and no hidden fees.',
};

const DESTINATIONS = [
  { place: 'United States', code: 'USD', rate: '1.00' },
  { place: 'Eurozone', code: 'EUR', rate: '0.86' },
  { place: 'United Kingdom', code: 'GBP', rate: '0.74' },
  { place: 'Japan', code: 'JPY', rate: '148.20' },
  { place: 'Australia', code: 'AUD', rate: '1.52' },
];

/**
 * Travel allows editorial imagery, but the financial UI stays monochrome —
 * the spec draws that line explicitly, so the destination module is a rates
 * table rather than a photo grid.
 */
export default async function TravelPage() {
  const [capital, rates] = await Promise.all([getCapital('travel'), getRates()]);

  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <ProductHero
          headline={
            <>
              Your money
              <br />
              anywhere.
            </>
          }
          copy="Bank Travel gives you global access, local freedom, and no hidden fees."
          primaryCta={{ label: 'Get Started', href: '/signup' }}
          secondaryCta={{ label: 'Learn More', href: '/resources' }}
          capital={capital.data}
          media={MEDIA.travel}
          phoneLabel="Travel wallet"
          seed={47}
        />

        <FunctionRow
          functions={[
            { icon: 'exchange', label: 'Multi-Currency' },
            { icon: 'allocate', label: 'No Hidden Fees' },
            { icon: 'intelligence', label: 'Travel Insights' },
            { icon: 'globe', label: 'Global Access' },
            { icon: 'protect', label: 'Secure Payments' },
          ]}
        />

        <ModuleSection title="Travel without limits." columns={2}>
          <CapitalOverview capital={capital.data} title="Travel Wallet" />

          <Card>
            <CardHeader title="Exchange Rates" />
            <CurrencyTicker rates={rates.data} />
            {!rates.isLive && <p className={styles.provenance}>{rates.source}</p>}
          </Card>

          <Card>
            <CardHeader title="Popular Destinations" />
            <dl className={styles.destinations}>
              {DESTINATIONS.map((destination) => (
                <div key={destination.code} className={styles.destination}>
                  <dt>{destination.place}</dt>
                  <dd className="tabular">
                    <span className={styles.destinationCode}>{destination.code}</span>
                    {destination.rate}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <CardHeader title="Card Controls" />
            <ul className={styles.controls}>
              <li>Freeze and unfreeze instantly</li>
              <li>Set per-country spending limits</li>
              <li>Approve international transfers</li>
              <li>Real-time travel spend alerts</li>
            </ul>
          </Card>
        </ModuleSection>

        <ProductCTA
          headline="More places. Fewer barriers."
          copy="Take Bank with you and spend like a local, anywhere."
          cta={{ label: 'Get Started', href: '/signup' }}
        />
      </main>
      <Footer />
    </>
  );
}
