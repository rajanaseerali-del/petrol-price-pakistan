import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://petrolpricepakistan.pk'),
  title: {
    default: 'Petrol Price Today in Pakistan | Official Verified Fuel Rates (OGRA)',
    template: '%s | Petrol Price Pakistan',
  },
  description:
    'Check today petrol price and diesel price in Pakistan. Officially verified rates from OGRA circulars and Ministry of Energy notifications with live calculator and history.',
  keywords: [
    'petrol price today pakistan',
    'petrol rate in pakistan',
    'diesel price today',
    'ogra petroleum prices',
    'fuel price revision pakistan',
    'hi octane price pakistan',
    'kerosene oil price pakistan',
    'lpg price pakistan',
    'petrol calculator pakistan',
  ],
  authors: [{ name: 'Petrol Price Pakistan Research Team', url: 'https://petrolpricepakistan.pk/about' }],
  creator: 'Petrol Price Pakistan',
  publisher: 'Petrol Price Pakistan',
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Petrol Price Today in Pakistan | Official OGRA Rates',
    description:
      'Verified petrol, diesel and hi-octane rates in Pakistan with historical changes and fuel cost calculator.',
    url: 'https://petrolpricepakistan.pk',
    siteName: 'Petrol Price Pakistan',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Petrol Price Today in Pakistan - Official OGRA Verified Rates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petrol Price Today in Pakistan | Official OGRA Rates',
    description:
      'Official verified petroleum prices, diesel rates, and fuel cost calculators in Pakistan.',
    images: ['/opengraph-image'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'petrolpricepakistan-verification',
  },
};

const jsonLdGlobal = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://petrolpricepakistan.pk/#organization',
      name: 'Petrol Price Pakistan',
      url: 'https://petrolpricepakistan.pk',
      logo: 'https://petrolpricepakistan.pk/opengraph-image',
      description: 'Official verified petroleum prices, diesel rates, and fuel cost calculators in Pakistan.',
      sameAs: [
        'https://price.ogra.org.pk',
        'https://www.petroleum.gov.pk',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://petrolpricepakistan.pk/#website',
      url: 'https://petrolpricepakistan.pk',
      name: 'Petrol Price Pakistan',
      publisher: {
        '@id': 'https://petrolpricepakistan.pk/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${fontSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGlobal) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans text-base leading-relaxed selection:bg-emerald-300 selection:text-emerald-950 transition-colors duration-200">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
