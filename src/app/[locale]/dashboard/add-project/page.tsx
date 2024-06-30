import { redirect } from 'next/navigation';

import { ADD_PROJECT_LANG_PARAM_NAME, PROJECT_ID_PARAM_NAME } from '../_components/constants';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { AddProjectForm } from './_components';
import { locales } from '@/lib/constants';
import { db } from '@/lib/prisma';
import { ExistingProject } from './_components/types';
import { getExistingProject } from './_components/utils';
import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';

const Page = async ({
  searchParams: { lang, projectId },
}: {
  searchParams: { [ADD_PROJECT_LANG_PARAM_NAME]?: string; [PROJECT_ID_PARAM_NAME]?: string };
}) => {
  const session = await handleNoSessionRedirect();

  if (lang && !locales.includes(lang)) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  let existingProject: ExistingProject | undefined = undefined;
  if (!!projectId && !isNaN(Number(projectId))) {
    const existingDbProject = await getExistingProject(session.user.id, Number(projectId));

    if (!existingDbProject) {
      redirect(FRONTEND_ROUTES.dashboardProjects);
    }

    existingProject = existingDbProject;
  }

  const caterogies = await db.categoryTranslation.findMany({
    where: {
      language: {
        locale: 'pl',
      },
    },
  });
  const languages = await db.language.findMany();
  const initialLanguageId = languages.find((language) => language.locale === (!!lang ? lang : 'pl'))?.id ?? 1;
  const initialCategoryId = !!existingProject ? existingProject.categoryId : caterogies[0].categoryId;

  return (
    <div>
      <h2 className="mb-10 text-4xl">
        {!!lang && !!existingProject ? (
          <div>
            Utwórz projekt <span className="font-medium">{existingProject.translations[0].title}</span> w języku:{' '}
            <span className="uppercase">{lang}</span>
          </div>
        ) : (
          'Nowy projekt'
        )}
      </h2>
      <AddProjectForm
        categories={caterogies}
        languages={languages}
        initialLanguageId={String(initialLanguageId)}
        initialCategoryId={String(initialCategoryId)}
      />
    </div>
  );
};

export default Page;
