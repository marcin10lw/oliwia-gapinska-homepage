import { redirect } from 'next/navigation';

import { locales } from '@/lib/constants';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { ProjectTranslationInformationFields } from '../../../_components';
import { EditBasicInformationForm, getToEditProject } from './_components';

const page = async ({
  params: { projectUid, projectLocale },
}: {
  params: { projectUid: string; projectLocale: string };
}) => {
  if (!locales.includes(projectLocale)) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  const projectTranslation = await getToEditProject(projectUid, projectLocale);

  if (!projectTranslation) {
    return <h1 className="text-2xl">Nie udało się znaleźć projektu</h1>;
  }

  const initialValues: ProjectTranslationInformationFields = {
    title: projectTranslation.title,
    year: projectTranslation.year,
    medium: projectTranslation.medium,
    dimensions: projectTranslation.dimensions,
    duration: projectTranslation.duration,
    description: projectTranslation.description,
  };

  return (
    <div>
      <h2 className="mb-10 text-4xl">
        Edytujesz projekt &quot;<span className="font-medium">{projectTranslation.title}</span>&quot; w języku:{' '}
        <span className="font-medium uppercase">{projectLocale}</span>
      </h2>
      <EditBasicInformationForm initialValues={initialValues} projectTranslation={projectTranslation} />
    </div>
  );
};

export default page;
