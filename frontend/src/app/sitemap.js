export default function sitemap() {
  const baseUrl = 'https://nextaxi.es';
  const locales = ['es', 'en'];
  const paths = ['', '/home', '/nosotros', '/contacto', '/reserva'];

  const sitemaps = [];

  locales.forEach((locale) => {
    paths.forEach((path) => {
      sitemaps.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' || path === '/home' ? 1 : 0.8,
      });
    });
  });

  return sitemaps;
}
