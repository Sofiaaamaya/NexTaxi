import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../../styles/global.css';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { AuthProvider } from '../../context/AuthContext';

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
      <body className="bg-background text-primary text-justify">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <Header />
            <main className="max-w-6xl lg:w-4/5 mx-auto px-4 py-10">{children}</main>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
