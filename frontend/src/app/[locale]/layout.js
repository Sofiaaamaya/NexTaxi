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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'NexTaxi - Tu Servicio de Taxi de Confianza',
  description:
    'NexTaxi ofrece traslados rápidos, seguros y cómodos. Reserva tu viaje en línea y disfruta de la mejor experiencia en transporte.',
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // CARGA COMPATIBLE CON EDGE RUNTIME
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locales/${locale}.json`);

  if (!res.ok) notFound();

  const messages = await res.json();

  return (
    <html lang={locale} suppressHydrationWarning className={poppins.variable}>
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
        ></script>
      </head>

      <body
        className={`${poppins.className} bg-background text-textPrimary antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
