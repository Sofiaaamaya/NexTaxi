import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/constants/locales';

const DASHBOARD_SEGMENTS = ['admin', 'conductor', 'usuario', 'gerente'];

export default function CatchAll({ params }) {
  const { slug } = params;
  const path = Array.isArray(slug) ? slug.join('/') : '';
  
  // Si la ruta ya tiene locale válido como primer segmento, no tocar
  const firstSegment = Array.isArray(slug) ? slug[0] : '';
  if (LOCALES.includes(firstSegment)) {
    redirect(`/${path}`);
  }

  // Si es ruta de dashboard, no redirigir a home
  const secondSegment = Array.isArray(slug) ? slug[1] : '';
  if (DASHBOARD_SEGMENTS.includes(secondSegment)) {
    redirect(`/${DEFAULT_LOCALE}/${path}`);
  }

  redirect(`/${DEFAULT_LOCALE}/home`);
}