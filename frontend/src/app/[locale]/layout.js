import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../../styles/global.css';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../data/translations/${locale}.json`)).default;
  } catch {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="max-w-6xl lg:w-4/5 mx-auto px-4 py-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
