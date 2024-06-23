import { getTranslations } from 'next-intl/server';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { buttonVariants } from '@/components/ui/button';
import { DashboardProjects } from './_components';
import { Link } from '@/lib/navigation';

const Page = async () => {
  const t = await getTranslations('dashboard.projects');

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-5">
        <h1 className="text-4xl">{t('heading')}</h1>
        <Link href={FRONTEND_ROUTES.dashboardAddProject} className={buttonVariants({ size: 'sm', className: 'mt-1' })}>
          {t('addProjectLinkText')}
        </Link>
      </div>
      <DashboardProjects />
    </div>
  );
};

export default Page;
