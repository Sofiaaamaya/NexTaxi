// i18n/request.mjs
import { getRequestConfig } from 'next-intl/server';
import { LOCALES, DEFAULT_LOCALE } from '../src/lib/constants/locales';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? DEFAULT_LOCALE;

  if (!LOCALES.includes(locale)) {
    return {
      locale: DEFAULT_LOCALE,
      messages: (await import(`../src/data/translations/${DEFAULT_LOCALE}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`../src/data/translations/${locale}.json`)).default,
  };
});
