import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '@/styles/global.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { AuthProvider } from '@/context/AuthContext';

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
      <body className="bg-background text-textPrimary antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <Header />
<main className="w-full flex justify-center"> 
  <div className="w-full max-w-6xl px-4 md:px-8 py-10">
    {children}
  </div>
</main>

            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
