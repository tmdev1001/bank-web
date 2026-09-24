import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Icon, type IconName } from '@/components/ui/Icon';
import { MEDIA } from '@/content/media';
import { HeroMedia } from '@/components/ui/HeroMedia';
import styles from './resources.module.css';

export const metadata: Metadata = {
  title: 'Resources — Bank',
  description: 'Guidance, information, and support to help you understand and act.',
};

const CATEGORIES = [
  { id: 'guides', label: 'Guides' },
  { id: 'help', label: 'Help Center' },
  { id: 'developers', label: 'Developers' },
  { id: 'api', label: 'API' },
  { id: 'security', label: 'Security' },
  { id: 'status', label: 'Status' },
];

const ARTICLES: { icon: IconName; title: string; detail: string; href: string }[] = [
  { icon: 'move', title: 'Getting Started with Bank', detail: 'Begin your journey with Bank.', href: '/resources#guides' },
  { icon: 'globe', title: 'Understanding the Global Dollar', detail: 'How the global reference works.', href: '/global-dollar' },
  { icon: 'intelligence', title: 'Using Alpha', detail: 'Autonomous investing, explained.', href: '/invest/alpha' },
  { icon: 'protect', title: 'Account Security', detail: 'How we keep your money safe.', href: '/resources#security' },
  { icon: 'exchange', title: 'Money Movement', detail: 'Send, receive, and exchange.', href: '/resources#guides' },
  { icon: 'manage', title: 'Developer Documentation', detail: 'Build with Bank.', href: '/resources#developers' },
];

/**
 * Resources is search-first, as the spec asks.
 *
 * The search control is a real <form> with a labelled input so it works
 * without JavaScript and announces itself properly; wiring it to a search
 * backend is a server action away.
 */
export default function ResourcesPage() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className={styles.heroShell} aria-labelledby="resources-heading">
          <div className={`container ${styles.hero}`}>
          <div className={styles.heroContent}>
            <h1 id="resources-heading" className={styles.headline}>
              Knowledge
              <br />
              moves everyone
              <br />
              forward.
            </h1>
            <p className={styles.copy}>
              Guidance, information, and support to help you understand and act.
            </p>
          </div>
          <div className={styles.heroVisual}>
            {/* <HeroMedia
              src={MEDIA.resources.src}
              alt={MEDIA.resources.alt}
              ratio="16 / 9"
              sizes="(max-width: 1023px) 100vw, 40vw"
              className={styles.photo}
            /> */}
          </div>
          </div>
        </section>

        <section className={`container ${styles.searchSection}`} aria-labelledby="search-heading">
          <h2 id="search-heading" className="visuallyHidden">
            Search resources
          </h2>
          <form className={styles.search} action="/resources" role="search">
            <label htmlFor="resource-search" className="visuallyHidden">
              Search resources
            </label>
            <Icon name="observe" size={18} />
            <input
              id="resource-search"
              name="q"
              type="search"
              className={styles.searchInput}
              placeholder="Search resources..."
            />
            <button type="submit" className="btn btnPrimary">
              Search
            </button>
          </form>

          <nav aria-label="Resource categories">
            <ul className={`${styles.categories} rail`}>
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <a href={`#${category.id}`} className={styles.category}>
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section className={`container ${styles.articles}`} aria-labelledby="featured-heading">
          <h2 id="featured-heading" className={styles.sectionHeading}>
            Featured Resources
          </h2>
          <ul className={styles.articleGrid}>
            {ARTICLES.map((article) => (
              <Card key={article.title} as="li" interactive>
                <Link href={article.href} className={styles.article}>
                  <Icon name={article.icon} size={22} />
                  <span>
                    <span className={styles.articleTitle}>{article.title}</span>
                    <span className={styles.articleDetail}>{article.detail}</span>
                  </span>
                  <Icon name="arrowRight" size={16} />
                </Link>
              </Card>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
