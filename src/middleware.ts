import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // Define supported locales and the default
  locales,
  defaultLocale
});

export const config = {
  // Match routes with or without locale prefixes
  matcher: ['/', '/(en)/:path*']
};