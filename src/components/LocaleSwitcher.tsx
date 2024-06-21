'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale } from 'next-intl';

import { usePathname } from '@/lib/navigation';
import { locales } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const LocaleSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const stringSearchParams = new URLSearchParams(searchParams).toString();

  const onLocaleChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.push(`/${newLocale}${pathname}${stringSearchParams.length > 0 ? `?${stringSearchParams}` : ''}`);
    });
  };

  return (
    <div className="flex items-center border border-primary">
      {locales.map((localeItem) => (
        <button
          key={localeItem}
          className={cn('px-1.5 py-1 text-[0.625rem] font-medium uppercase', {
            'bg-primary text-white': locale === localeItem,
          })}
          onClick={() => onLocaleChange(localeItem)}
          disabled={isPending}
        >
          {localeItem}
        </button>
      ))}
    </div>
  );
};
