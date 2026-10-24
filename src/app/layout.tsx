import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
    'petrol calculator pakistan',
  ],
  authors: [{ name: 'Petrol Price Pakistan Research Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Petrol Price Today in Pakistan | Official OGRA Rates',
    description:
      'Verified petrol, diesel and hi-octane rates in Pakistan with historical changes and fuel cost calculator.',
    url: 'https://petrolpricepakistan.pk',
    siteName: 'Petrol Price Pakistan',
    locale: 'en_PK',
    type: 'website',
  },
};

import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://petrolpricepakistan.pk" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-emerald-300 selection:text-emerald-950 transition-colors duration-200">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
