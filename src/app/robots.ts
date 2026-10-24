import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://petrolpricepakistan.pk/sitemap.xml',
    host: 'https://petrolpricepakistan.pk',
  };
}
