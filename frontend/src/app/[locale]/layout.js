import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '@/styles/global.css';
import { AuthProvider } from '@/context/AuthContext';
import LayoutWrapper from '@/components/common/LayoutWrapper';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'NexTaxi - Tu Servicio de Taxi de Confianza',
  description: 'NexTaxi ofrece traslados rápidos, seguros y cómodos. Reserva tu viaje en línea y disfruta de la mejor experiencia en transporte.',
  keywords: 'taxi, transporte, reserva de taxi, traslados, viajes seguros, NexTaxi',
  authors: [{ name: 'NexTaxi Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  manifest: '/manifest.json',
  openGraph: {
    title: 'NexTaxi - Tu Servicio de Taxi de Confianza',
    description: 'Reserva tu taxi de forma rápida y segura con NexTaxi.',
    url: 'https://nextaxi.es',
    siteName: 'NexTaxi',
    images: [
      {
        url: '/images/taxi_banner.webp',
        width: 1200,
        height: 630,
        alt: 'NexTaxi Banner',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexTaxi - Tu Servicio de Taxi de Confianza',
    description: 'Reserva tu taxi de forma rápida y segura con NexTaxi.',
    images: ['/images/taxi_banner.webp'],
  },
};



export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../data/translations/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
<html lang={locale} suppressHydrationWarning className={poppins.variable}>
  <head>
    <script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      async
    ></script>
  </head>

  <body className={`${poppins.className} bg-background text-textPrimary antialiased`} suppressHydrationWarning>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </AuthProvider>
    </NextIntlClientProvider>
  </body>
</html>

  );
}
