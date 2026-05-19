import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/lib/constants/locales';

export default function CatchAll({ params }) {
  const { slug } = params;
  const path = Array.isArray(slug) ? slug.join('/') : '';
  redirect(`/${DEFAULT_LOCALE}/${path}`);
}
