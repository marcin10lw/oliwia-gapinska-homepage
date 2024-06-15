'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './LocaleSwitcher';

export const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <div className="relative z-10">
      <nav className="bg-background px-global-sm py-5 lg:px-global-lg lg:py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="border-b-[2.5px] border-b-primary pb-[0.125rem] text-base font-semibold sm:text-xl">
            Oliwia Gapińska
          </Link>

          <div className="flex items-center">
            <ul
              className={cn(
                'absolute bottom-0 left-0 right-0 -z-[1] flex flex-col items-center border-b border-muted transition-transform duration-300 ease-in-out lg:static lg:z-0 lg:translate-y-0 lg:flex-row lg:border-none',
                {
                  'translate-y-full': navOpen,
                },
              )}
            >
              <li>
                <Link
                  href="/"
                  className="block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-5 py-2.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-slate-500"
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
  );
};
