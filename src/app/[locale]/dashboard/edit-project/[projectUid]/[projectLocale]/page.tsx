import { redirect } from 'next/navigation';

import { ProjectBasicInformationFields } from '../../../_components';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { EditBasicInformationForm, getToEditProject } from './_components';
import { locales } from '@/lib/constants';
import { db } from '@/lib/prisma';

const page = async ({
  params: { projectUid, projectLocale },
}: {
  params: { projectUid: string; projectLocale: string };
}) => {
  if (!locales.includes(projectLocale)) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  const categories = await db.categoryTranslation.findMany({
    where: {
      language: {
        locale: 'pl',
      },
    },
  });

  const languages = await db.language.findMany();

  const projectTranslation = await getToEditProject(projectUid, projectLocale);

  if (!projectTranslation) {
    return <h1 className="text-2xl">Nie udało się znaleźć projektu</h1>;
  }

  const initialValues: ProjectBasicInformationFields = {
    category: String(projectTranslation.project.categoryId),
    language: String(languages.find((language) => language.locale === projectLocale)?.id),
    title: projectTranslation.title,
    year: projectTranslation.year,
    medium: projectTranslation.medium,
    dimensions: projectTranslation.dimensions,
    duration: projectTranslation.duration,
    description: projectTranslation.description,
  };

  return (
    <EditBasicInformationForm
      categories={categories}
      languages={languages}
      initialValues={initialValues}
      projectTranslation={projectTranslation}
    />
  );
};

export default page;
