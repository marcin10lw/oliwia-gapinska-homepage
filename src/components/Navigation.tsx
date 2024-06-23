'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { LocaleSwitcher } from './LocaleSwitcher';
import { SignOutButton } from './SignOutButton';
import { usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const t = useTranslations('');

  const closeMenu = () => setNavOpen(false);

  return (
    <>
      <div
        className={cn('fixed inset-0 bg-black/10 transition-all duration-300 lg:hidden', {
          'visible opacity-100 lg:hidden': navOpen,
          'invisible opacity-0': !navOpen,
        })}
        onClick={closeMenu}
      />
      <div className="relative z-10">
        <nav className="bg-background px-global-x-sm py-5 shadow-sm lg:px-global-x-lg lg:py-8">
          <div className="flex items-center justify-between">
            <Logo />

            <div className="flex items-center">
              <ul
                className={cn(
                  'absolute bottom-0 left-0 right-0 -z-[1] flex flex-col items-center border-b border-muted bg-background transition-transform duration-300 ease-in-out lg:static lg:z-0 lg:translate-y-0 lg:flex-row lg:border-none',
                  {
                    'translate-y-full': navOpen,
                  },
                )}
              >
                <li>
                  <Link
                    href="/"
                    className={cn(
                      'block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500',
                      {
                        'text-slate-600': pathname === '/',
                      },
                    )}
                    onClick={closeMenu}
                  >
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={FRONTEND_ROUTES.about}
                    className={cn(
                      'block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500',
                      {
                        'text-slate-600': pathname === FRONTEND_ROUTES.about,
                      },
                    )}
                    onClick={closeMenu}
                  >
                    {t('nav.about')}
                  </Link>
                </li>
                {!!session && (
                  <>
                    <li>
                      <Link
                        href={FRONTEND_ROUTES.dashboard}
                        className={cn(
                          'block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500',
                          {
                            'text-slate-600': pathname === FRONTEND_ROUTES.dashboard,
                          },
                        )}
                        onClick={closeMenu}
                      >
                        {t('nav.dashboard')}
                      </Link>
                    </li>
                    <li>
                      <SignOutButton
                        variant="link"
                        className="block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500 hover:no-underline"
                      />
                    </li>
                  </>
                )}
              </ul>

              <LocaleSwitcher />
              <button onClick={() => setNavOpen((prev) => !prev)} className="ml-4 lg:hidden">
                {navOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
