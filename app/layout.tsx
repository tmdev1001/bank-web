import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bank — A more open financial system',
  description:
    'Bank is an AI financial system that connects, manages, exchanges, and allocates capital across currencies, accounts, platforms, and markets.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  /* Never cap zoom: the spec requires the page to work without it, and
     blocking it would fail WCAG 2.2 AA regardless. */
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
