import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://petrolpricepakistan.pk';
  const now = '2026-10-18T18:00:00.000Z';

  const routes = [
    '',
    '/petrol-price-in-pakistan',
    '/diesel-price-in-pakistan',
    '/hi-octane-price-in-pakistan',
    '/petrol-price-history',
    '/diesel-price-history',
    '/fuel-price-changes',
    '/petrol-calculator',
    '/petrol-price-by-city',
    '/methodology',
    '/about',
    '/contact',
    '/privacy-policy',
    '/editorial-policy',
    '/disclaimer',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route.includes('price') ? 'hourly' : 'weekly',
    priority: route === '' ? 1.0 : route.includes('price') ? 0.9 : 0.6,
  }));
}
