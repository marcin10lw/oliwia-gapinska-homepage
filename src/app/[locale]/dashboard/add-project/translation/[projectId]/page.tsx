import { redirect } from 'next/navigation';

import { AddProjectTranslationFields, AddProjectTranslationForm } from './_components';
import { ADD_PROJECT_LANG_PARAM_NAME } from '../../../_components/constants';
import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { getExistingProject } from './_components/utils';
import { locales } from '@/lib/constants';
import { db } from '@/lib/prisma';

const page = async ({
  params: { projectId },
  searchParams: { lang },
}: {
  params: { projectId: string };
  searchParams: { [ADD_PROJECT_LANG_PARAM_NAME]?: string };
}) => {
  if (!lang || !locales.includes(lang) || !projectId || isNaN(Number(projectId))) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  const session = await handleNoSessionRedirect();

  const existingProject = await getExistingProject(session.user.id, Number(projectId));

  const language = await db.language.findFirst({
    where: {
      locale: lang,
    },
  });

  if (!existingProject || !language || existingProject.translations.length === locales.length) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  const projectTranslation = existingProject.translations[0];

  const initialValues: AddProjectTranslationFields = {
    title: projectTranslation.title ?? '',
    year: projectTranslation.year ?? '',
    medium: projectTranslation.medium ?? '',
    dimensions: projectTranslation.dimensions ?? '',
    duration: projectTranslation.duration ?? '',
    description: projectTranslation.description ?? '',
    language: String(language.id),
  };

  return (
    <div>
      <h2 className="mb-10 text-4xl">
        Dodaj projekt <span className="font-semibold">{existingProject.translations[0].title}</span> w wersji:{' '}
        <span className="uppercase">{lang}</span>
      </h2>
      <AddProjectTranslationForm initialValues={initialValues} projectId={existingProject.id} />
    </div>
  );
};

export default page;
