import type { StaticImageData } from 'next/image';
import home from '@/media/home.png';
import personal from '@/media/personal.png';
import business from '@/media/business.png';
import family from '@/media/family.png';
import travel from '@/media/travel.png';
import invest from '@/media/invest.png';
import alpha from '@/media/alpha.png';
import globalDollar from '@/media/global-dollar.png';
import resources from '@/media/resources.png';
import company from '@/media/company.png';
import plus from '@/media/plus.png';
import ventures from '@/media/ventures.jpg';

/**
 * Page photography, with its alternative text.
 *
 * Alt text lives BESIDE the image rather than at each call site, so a
 * photograph cannot be reused somewhere with a description that no longer
 * matches it. Each one describes what the image shows and why it is there,
 * not "photo of ...".
 *
 * FORMAT NOTE: ventures.jpg is the one JPEG here. The PNG crops are ~200px
 * wide, where PNG costs little; the Ventures hero is a 576px photograph, and
 * as PNG it weighed 8x its peers for identical output. next/image re-encodes
 * every source to AVIF/WebP regardless, so the source format only ever
 * affects repository weight.
 *
 * SOURCE NOTE: these are cropped from the supplied 1536x1024 artwork board, so
 * each is roughly 180-220px wide. That is enough for review but NOT for
 * production heroes, which need the full-resolution originals. Replacing a
 * file in /media is the only change required — nothing here or at any call
 * site needs touching.
 */
export interface PageMedia {
  src: StaticImageData;
  alt: string;
}

export const MEDIA = {
  home: {
    src: home,
    alt: 'The curve of Earth at night, city lights tracing the continents.',
  },
  personal: {
    src: personal,
    alt: 'A man checking his finances on his phone beside a window.',
  },
  business: {
    src: business,
    alt: 'Glass office towers seen from street level, sunlight between them.',
  },
  family: {
    src: family,
    alt: 'Two people walking hand in hand along a beach at sunset.',
  },
  travel: {
    src: travel,
    alt: 'An aircraft wing above the clouds at sunrise, seen from the cabin window.',
  },
  invest: {
    src: invest,
    alt: 'A laptop showing a markets view with a rising performance chart.',
  },
  alpha: {
    src: alpha,
    alt: 'A sculptural figure in profile, lit from behind — autonomous intelligence.',
  },
  globalDollar: {
    src: globalDollar,
    alt: 'A globe rendered as a network of connected points.',
  },
  resources: {
    src: resources,
    alt: 'A quiet desk with a laptop and a stack of books on finance and technology.',
  },
  company: {
    src: company,
    alt: 'The BANK wordmark mounted on the facade of a dark building.',
  },
  plus: {
    src: plus,
    alt: 'The Bank Plus app on a phone, showing total capital and quick actions.',
  },
  ventures: {
    src: ventures,
    alt: 'Glass towers rising toward an open sky, sunlight breaking between them.',
  },
} satisfies Record<string, PageMedia>;
