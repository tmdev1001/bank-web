import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardHeader } from '@/components/ui/Card';
import { Icon, type IconName } from '@/components/ui/Icon';
import { MEDIA } from '@/content/media';
import { HeroMedia } from '@/components/ui/HeroMedia';
import styles from './company.module.css';

export const metadata: Metadata = {
  title: 'Company — Bank',
  description:
    'Bank is building financial infrastructure for a more connected, equitable, and global economy.',
};

const VALUES: { icon: IconName; label: string; detail: string }[] = [
  { icon: 'globe', label: 'Global Perspective', detail: 'Built for how money actually moves across borders.' },
  { icon: 'intelligence', label: 'Innovative Technology', detail: 'Intelligence applied to capital, not to attention.' },
  { icon: 'family', label: 'People First', detail: 'Financial access is infrastructure, not a privilege.' },
  { icon: 'allocate', label: 'Long-Term Impact', detail: 'Built to compound over decades, not quarters.' },
];

const SECTIONS = [
  { id: 'story', title: 'Story', copy: 'Bank began with a simple question: why does moving money still feel like the hardest part of having it?' },
  { id: 'leadership', title: 'Leadership', copy: 'A team drawn from banking infrastructure, markets, and systems engineering.' },
  { id: 'careers', title: 'Careers', copy: 'We are hiring across engineering, risk, design, and operations.' },
  { id: 'newsroom', title: 'Newsroom', copy: 'Announcements, research, and product releases from Bank.' },
  { id: 'partners', title: 'Partners', copy: 'Institutions and platforms building on Bank infrastructure.' },
  { id: 'compliance', title: 'Security and Compliance', copy: 'How Bank meets its regulatory and security obligations.' },
];

export default function CompanyPage() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className={`container ${styles.hero}`} aria-labelledby="company-heading">
          <div className={styles.heroContent}>
            <h1 id="company-heading" className={styles.headline}>
              A more open
              <br />
              financial future.
            </h1>
            <p className={styles.copy}>
              We are building the financial infrastructure for a more connected, equitable, and
              global economy.
            </p>
            <div className={styles.actions}>
              <Link href="#story" className="btn btnPrimary">
                Our Story
              </Link>
              <Link href="#careers" className="btn btnSecondary">
                Careers
              </Link>
            </div>
          </div>

          {/* Architectural imagery rather than generic finance stock, as the
              spec asks for. */}
          <div className={styles.heroVisual}>
            <HeroMedia
              src={MEDIA.company.src}
              alt={MEDIA.company.alt}
              ratio="4 / 3"
              priority
              sizes="(max-width: 1023px) 100vw, 42vw"
            />
          </div>
        </section>

        <section className={`container ${styles.values}`} aria-label="What we value">
          <ul className={`${styles.valueList} rail`}>
            {VALUES.map((value) => (
              <li key={value.label} className={styles.value}>
                <Icon name={value.icon} size={22} />
                <h2 className={styles.valueLabel}>{value.label}</h2>
                <p className={styles.valueDetail}>{value.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={`container ${styles.mission}`} aria-labelledby="mission-heading">
          <div className={styles.missionCopy}>
            <h2 id="mission-heading" className={styles.sectionHeading}>
              Our mission.
            </h2>
            <p className={styles.missionText}>
              To build an open financial system that empowers people, businesses, and communities
              everywhere.
            </p>
            <Link href="#story" className="btn btnPrimary">
              Learn More
            </Link>
          </div>
          <div className={`${styles.missionPanel} onDark`}>
            <p className={styles.missionQuote}>Borderless by design.</p>
          </div>
        </section>

        <section className={`container ${styles.sections}`} aria-label="About Bank">
          <div className={styles.sectionGrid}>
            {SECTIONS.map((section) => (
              <Card key={section.id} as="section">
                <div id={section.id}>
                  <CardHeader title={section.title} />
                  <p className={styles.sectionCopy}>{section.copy}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
