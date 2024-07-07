import { redirect } from 'next/navigation';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { ChangeProjectCategoryForm } from './_components';
import { db } from '@/lib/prisma';

const page = async ({ params: { projectUid } }: { params: { projectUid: string } }) => {
  const project = await db.project.findUnique({
    where: {
      uid: projectUid,
    },
    include: {
      translations: true,
    },
  });

  if (!project) {
    redirect(FRONTEND_ROUTES.dashboard);
  }

  const categories = await db.categoryTranslation.findMany({
    where: {
      language: {
        locale: 'pl',
      },
    },
  });

  return (
    <div>
      <h2 className="mb-10 text-4xl">
        Zmień kategorię projektu &quot;<span className="font-medium">{project.translations[0].title}</span>&quot;
      </h2>
      <ChangeProjectCategoryForm
        categories={categories}
        initialCategory={String(project.categoryId)}
        projectId={project.id}
      />
    </div>
  );
};

export default page;
