'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export const DashboardNavigation = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-[1] flex items-center justify-center gap-5 border-b border-neutral-100 bg-background px-5 py-5 lg:py-8">
      <Link
        href={FRONTEND_ROUTES.dashboardProjects}
        className={cn('uppercase hover:underline', {
          'underline underline-offset-2': pathname === FRONTEND_ROUTES.dashboardProjects,
        })}
      >
        {t('dashboard.projects.linkText')}
      </Link>
      <Link
        href={FRONTEND_ROUTES.dashboardCategories}
        className={cn('uppercase hover:underline', {
          'underline underline-offset-2': pathname === FRONTEND_ROUTES.dashboardCategories,
        })}
      >
        {t('dashboard.categories.linkText')}
      </Link>
    </nav>
  );
};
