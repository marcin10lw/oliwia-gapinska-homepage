'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { locales } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();

  const onLocaleChange = (newLocale: string) => {
    if (!document) return;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
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
        >
          {localeItem}
        </button>
      ))}
    </div>
  );
};
