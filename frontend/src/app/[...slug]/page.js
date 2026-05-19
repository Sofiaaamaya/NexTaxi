import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/lib/constants/locales';

export default function CatchAllWithoutLocale({ params }) {
  const { slug } = params;

  const path = Array.isArray(slug) ? slug.join('/') : '';
  const target = path ? `/${DEFAULT_LOCALE}/${path}` : `/${DEFAULT_LOCALE}/home`;

  redirect(target);
}
