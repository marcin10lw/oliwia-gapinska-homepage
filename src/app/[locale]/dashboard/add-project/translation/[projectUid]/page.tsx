import { redirect } from 'next/navigation';

import { ADD_PROJECT_LANG_PARAM_NAME } from '../../../_components/constants';
import { ProjectTranslationInformationFields } from '../../../_components';
import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { AddProjectTranslationForm } from './_components';
import { getExistingProject } from './_components/utils';
import { locales } from '@/lib/constants';
import { db } from '@/lib/prisma';

const page = async ({
  params: { projectUid },
  searchParams: { lang },
}: {
  params: { projectUid: string };
  searchParams: { [ADD_PROJECT_LANG_PARAM_NAME]?: string };
}) => {
  if (!lang || !locales.includes(lang) || !projectUid) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  const session = await handleNoSessionRedirect();

  const existingProject = await getExistingProject(session.user.id, projectUid);

  const language = await db.language.findFirst({
    where: {
      locale: lang,
    },
  });

  if (!existingProject || !language || existingProject.translations.length === locales.length) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  const projectTranslation = existingProject.translations[0];

  const initialValues: ProjectTranslationInformationFields = {
    title: projectTranslation.title ?? '',
    year: projectTranslation.year ?? '',
    medium: projectTranslation.medium ?? '',
    dimensions: projectTranslation.dimensions ?? '',
    duration: projectTranslation.duration ?? '',
    description: projectTranslation.description ?? '',
  };

  return (
    <div>
      <h2 className="mb-10 text-4xl">
        Dodaj projekt &quot;<span className="font-medium">{existingProject.translations[0].title}</span>&quot; w wersji:{' '}
        <span className="font-medium uppercase">{lang}</span>
      </h2>
      <AddProjectTranslationForm
        initialValues={initialValues}
        projectId={existingProject.id}
        languageId={language.id}
      />
    </div>
  );
};

export default page;
