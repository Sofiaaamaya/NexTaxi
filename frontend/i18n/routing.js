import { defineRouting } from 'next-intl/routing';
import { LOCALES, DEFAULT_LOCALE } from '../src/lib/constants/locales';

export default defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});
