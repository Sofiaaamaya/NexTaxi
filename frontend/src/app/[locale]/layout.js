import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '@/styles/global.css';
import { AuthProvider } from '@/context/AuthContext';
import LayoutWrapper from '@/components/common/LayoutWrapper';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../data/translations/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-background text-textPrimary antialiased" suppressHydrationWarning>
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
