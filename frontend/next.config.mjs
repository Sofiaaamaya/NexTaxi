import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aquí puedes añadir otras configuraciones de Next.js si las necesitas
};

export default withNextIntl(nextConfig);
