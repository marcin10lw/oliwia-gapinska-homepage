import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/constants';

export default createMiddleware({
  locales,
  defaultLocale: 'pl',
});

export const config = {
  matcher: ['/((?!api|assets|.*\\..*|_next).*)'],
};
