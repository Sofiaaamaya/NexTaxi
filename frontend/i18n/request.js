import { LOCALES, DEFAULT_LOCALE } from '../src/lib/constants/locales';

export default async function getRequestConfig({ requestLocale }) {
  const locale = requestLocale ?? DEFAULT_LOCALE;

  const finalLocale = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;

  // Carga segura compatible con Edge Runtime
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locales/${finalLocale}.json`);

  if (!res.ok) {
    throw new Error(`No se pudo cargar el archivo de traducción: ${finalLocale}`);
  }

  const messages = await res.json();

  return {
    locale: finalLocale,
    messages,
  };
}
