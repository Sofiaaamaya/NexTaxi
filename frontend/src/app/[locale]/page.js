import { redirect } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/constants/locales';

export default function LocaleRootPage({ params }) {
  const { locale } = params;

  if (!LOCALES.includes(locale)) {
    redirect(`/${DEFAULT_LOCALE}/home`);
  }

  redirect(`/${locale}/home`);
}
