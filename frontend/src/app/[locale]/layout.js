import { NextIntlClientProvider } from 'next-intl';
import '@/styles/global.css';
import { AuthProvider } from '@/context/AuthContext';
import LayoutWrapper from '@/components/common/LayoutWrapper';

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
  const { locale } = params;

  let messages = {};

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(
      `${baseUrl}/locales/${locale}.json`,
      { cache: 'no-store' }
    );

    if (res.ok) {
      messages = await res.json();
    } else {
      console.error(`No se pudo cargar ${baseUrl}/locales/${locale}.json`);
    }
  } catch (err) {
    console.error('Error cargando traducciones:', err);
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
