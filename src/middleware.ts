import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/constants';

export default createMiddleware({
  locales,
  defaultLocale: 'pl',
  localePrefix: 'never',
});

export const config = {
  matcher: ['/', '/(pl|en)/:path*'],
};
