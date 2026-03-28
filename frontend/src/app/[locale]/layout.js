import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

export default async function LocaleLayout({children, params}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../data/translations/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}