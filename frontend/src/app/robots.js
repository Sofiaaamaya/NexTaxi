export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/gerente/'],
    },
    sitemap: 'https://nextaxi.es/sitemap.xml',
  };
}
