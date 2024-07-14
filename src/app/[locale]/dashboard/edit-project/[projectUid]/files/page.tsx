import { redirect } from 'next/navigation';

import { EditPreviewImageForm } from './_components/EditPreviewImageForm';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { EditImagesForm } from './_components/EditImagesForm';
import { EditVideoForm } from './_components/EditVideoForm';
import { db } from '@/lib/prisma';

const page = async ({ params: { projectUid } }: { params: { projectUid: string } }) => {
  const project = await db.project.findUnique({
    where: {
      uid: projectUid,
    },
    select: {
      previewImage: true,
      images: true,
      video: true,
    },
  });

  if (!project) {
    redirect(FRONTEND_ROUTES.dashboardProjects);
  }

  return (
    <div>
      <h2 className="mb-10 text-4xl lg:mb-14">Edytuj pliki projektu</h2>
      <div className="grid gap-5 lg:gap-10">
        <EditPreviewImageForm previewImageMedia={project.previewImage ?? undefined} projectUid={projectUid} />
        <EditImagesForm projectImagesMedia={project.images} />
        <EditVideoForm videoMedia={project.video ?? undefined} />
      </div>
    </div>
  );
};

export default page;
