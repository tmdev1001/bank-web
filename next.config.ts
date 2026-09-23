import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /*
     * AVIF first, WebP as the fallback (spec section on performance). Next
     * negotiates per request and generates the srcset, so a single source file
     * serves every density and breakpoint.
     */
    formats: ['image/avif', 'image/webp'],
    /*
     * Trimmed to the breakpoints this design actually uses. Every extra entry
     * is another variant built and cached for no benefit.
     */
    deviceSizes: [375, 414, 768, 1024, 1280, 1440, 1920],
    imageSizes: [180, 256, 384, 512, 768],
  },
};

export default nextConfig;
