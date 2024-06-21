'use client';

import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const t = useTranslations('nav');

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
                    className="block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500"
                    onClick={closeMenu}
                  >
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500"
                    onClick={closeMenu}
                  >
                    {t('about')}
                  </Link>
                </li>
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
