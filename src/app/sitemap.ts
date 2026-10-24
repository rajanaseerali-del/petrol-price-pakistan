import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://petrolpricepakistan.pk';
  const currentDate = new Date().toISOString();

  const routes: Array<{
    route: string;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
  }> = [
    { route: '', changeFrequency: 'daily', priority: 1.0 },
    { route: '/petrol-price-in-pakistan', changeFrequency: 'daily', priority: 0.95 },
    { route: '/diesel-price-in-pakistan', changeFrequency: 'daily', priority: 0.95 },
    { route: '/hi-octane-price-in-pakistan', changeFrequency: 'daily', priority: 0.9 },
    { route: '/kerosene-oil-price-in-pakistan', changeFrequency: 'daily', priority: 0.85 },
    { route: '/light-diesel-oil-price-in-pakistan', changeFrequency: 'daily', priority: 0.85 },
    { route: '/lpg-price-in-pakistan', changeFrequency: 'daily', priority: 0.85 },
    { route: '/petrol-price-by-city', changeFrequency: 'daily', priority: 0.9 },
    { route: '/petrol-calculator', changeFrequency: 'weekly', priority: 0.9 },
    { route: '/petrol-price-history', changeFrequency: 'daily', priority: 0.85 },
    { route: '/diesel-price-history', changeFrequency: 'daily', priority: 0.85 },
    { route: '/fuel-price-changes', changeFrequency: 'daily', priority: 0.85 },
    { route: '/advertise', changeFrequency: 'monthly', priority: 0.7 },
    { route: '/about', changeFrequency: 'monthly', priority: 0.6 },
    { route: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { route: '/privacy-policy', changeFrequency: 'monthly', priority: 0.5 },
    { route: '/editorial-policy', changeFrequency: 'monthly', priority: 0.5 },
    { route: '/disclaimer', changeFrequency: 'monthly', priority: 0.5 },
  ];

  return routes.map(item => ({
    url: `${baseUrl}${item.route}`,
    lastModified: currentDate,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
