import { redirect } from 'next/navigation';

export default async function LocaleIndexPage({ params }) {
  const { locale } = await params || {};
  if (locale && typeof locale === 'string') {
    redirect(`/${locale}/home`);
  } else {
    redirect('/home');
  }
}
