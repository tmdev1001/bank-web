import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { HeroMedia } from '@/components/ui/HeroMedia';
import { MEDIA } from '@/content/media';
import { FOCUS_AREAS, PORTFOLIO, SUPPORT } from '@/content/ventures';
import { PitchForm } from './PitchForm';
import styles from './ventures.module.css';

export const metadata: Metadata = {
  title: 'Ventures — Bank',
  description:
    'Bank Ventures invests in and supports companies building the next generation of financial infrastructure, commerce, technology, and global connectivity.',
};

/**
 * Bank Ventures — the investment arm.
 *
 * Editorial rather than operational: no product render, no live figures, no
 * dashboard modules. Ventures is the one page on the site with nothing to
 * demonstrate, so architectural photography, the type scale and whitespace
 * carry it instead, per the brief.
 *
 * The portfolio grid renders a coming-soon state for as long as `PORTFOLIO`
 * is empty — fictional companies were explicitly ruled out, and an empty
 * array is the only thing between this page and a real portfolio.
 */
export default function VenturesPage() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className={styles.heroShell} aria-labelledby="ventures-heading">
          <div className={`container ${styles.hero}`}>
          <div className={styles.heroContent}>
            <p className="eyebrow">Bank Ventures</p>
            <h1 id="ventures-heading" className={styles.headline}>
              Capital for
              <br />
              what&rsquo;s next.
            </h1>
            <p className={styles.copy}>
              Bank Ventures invests in and supports companies building the next generation of
              financial infrastructure, commerce, technology, and global connectivity.
            </p>
            <div className={styles.actions}>
              <Link href="#thesis" className="btn btnPrimary">
                Explore Ventures
              </Link>
              <Link href="#pitch" className={`btn btnSecondary ${styles.secondaryBtn}`}>
                Pitch Bank
              </Link>
            </div>
          </div>

          {/* Monumental architecture rather than the consumer photography used
              on Personal and Family, as the brief asks. */}
          <div className={styles.heroVisual}>
            {/* <HeroMedia
              src={MEDIA.ventures.src}
              alt={MEDIA.ventures.alt}
              ratio="4 / 3"
              priority
              sizes="(max-width: 1023px) 100vw, 42vw"
            /> */}
          </div>
          </div>
        </section>

        <section id="thesis" className={`container ${styles.thesis}`} aria-labelledby="thesis-heading">
          <div className={styles.thesisIntro}>
            <p className="eyebrow">Investment Thesis</p>
            <h2 id="thesis-heading" className={styles.sectionHeading}>
              We invest in a more connected financial future.
            </h2>
            <p className={styles.sectionCopy}>
              Bank Ventures looks for founders building systems that expand how people and
              businesses create, access, manage, and move value.
            </p>
          </div>

          <ul className={styles.focusGrid}>
            {FOCUS_AREAS.map((area) => (
              <Card key={area.label} as="li">
                <Icon name={area.icon} size={22} />
                <h3 className={styles.focusLabel}>{area.label}</h3>
                <p className={styles.focusDetail}>{area.detail}</p>
              </Card>
            ))}
          </ul>
        </section>

        <section className={`container ${styles.provide}`} aria-labelledby="provide-heading">
          <div className={styles.provideCopy}>
            <p className="eyebrow">What We Provide</p>
            <h2 id="provide-heading" className={styles.sectionHeading}>
              More than capital.
            </h2>
            <p className={styles.sectionCopy}>
              Bank can support portfolio companies with capital, product strategy, financial
              infrastructure, distribution, technology and access to the broader Bank ecosystem.
            </p>
          </div>
          <div className={`${styles.providePanel} onDark`}>
            <p className={styles.provideQuote}>
              The goal isn&rsquo;t simply to invest in companies. It&rsquo;s to help build
              infrastructure that can compound alongside Bank.
            </p>
          </div>
        </section>

        <section
          className={`container ${styles.support}`}
          aria-label="What Bank brings to a portfolio company"
        >
          <ul className={`${styles.supportList} rail`}>
            {SUPPORT.map((item) => (
              <li key={item.label} className={styles.supportItem}>
                <Icon name={item.icon} size={20} />
                <span className={styles.supportLabel}>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="portfolio"
          className={`container ${styles.portfolio}`}
          aria-labelledby="portfolio-heading"
        >
          <div className={styles.portfolioIntro}>
            <p className="eyebrow">Portfolio</p>
            <h2 id="portfolio-heading" className={styles.sectionHeading}>
              Companies building tomorrow.
            </h2>
          </div>

          {PORTFOLIO.length > 0 ? (
            <ul className={styles.portfolioGrid}>
              {PORTFOLIO.map((company) => (
                <Card key={company.name} as="li" interactive>
                  <div className={styles.portfolioMark}>
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        height={26}
                        className={styles.portfolioLogo}
                      />
                    ) : (
                      <span className={styles.portfolioLetter} aria-hidden="true">
                        {company.name.slice(0, 1)}
                      </span>
                    )}
                  </div>
                  <h3 className={styles.portfolioCompany}>{company.name}</h3>
                  <p className={styles.portfolioCategory}>{company.category}</p>
                  <p className={styles.portfolioDetail}>{company.description}</p>
                  <Link href={company.href} className={`textLink ${styles.portfolioLink}`}>
                    View Company
                    <Icon name="arrowRight" size={16} />
                  </Link>
                </Card>
              ))}
            </ul>
          ) : (
            /* Deliberate: no placeholder companies and no sample logos. The
               grid above is the real one and renders the moment one exists. */
            <div className={styles.portfolioEmpty}>
              <p className={styles.portfolioEmptyTitle}>Portfolio coming soon.</p>
              <p className={styles.portfolioEmptyCopy}>
                Bank Ventures has not yet announced investments. Companies will be listed here as
                they are.
              </p>
            </div>
          )}
        </section>

        <section id="pitch" className={`container ${styles.pitch}`} aria-labelledby="pitch-heading">
          <div className={styles.pitchIntro}>
            <p className="eyebrow">Building something important?</p>
            <h2 id="pitch-heading" className={styles.sectionHeading}>
              Build the future with us.
            </h2>
            <p className={styles.sectionCopy}>
              We&rsquo;re interested in founders working on ambitious products at the intersection
              of money, technology and global opportunity.
            </p>
          </div>
          <PitchForm />
        </section>

        <section className={`container ${styles.closingWrap}`} aria-labelledby="closing-heading">
          <div className={`${styles.closing} onDark`}>
            <h2 id="closing-heading" className={styles.closingHeading}>
              Capital. Technology. Opportunity.
            </h2>
            <div className={styles.closingBrand}>
              <span className="wordmark">Bank</span>
              <span className={styles.closingTag}>Ventures</span>
            </div>
            <p className={styles.closingLine}>A more open financial future.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
