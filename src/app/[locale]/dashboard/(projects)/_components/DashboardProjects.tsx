import Image from 'next/image';

import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';
import { db } from '@/lib/prisma';

export const DashboardProjects = async () => {
  const session = await handleNoSessionRedirect();

  const projects = await db.project.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      previewImage: true,
      translations: true,
    },
  });

  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {projects.map((project) => {
          const projectTranslation = project.translations[0];
          const previewImage = project.previewImage?.publicUrl;

          return (
            <li key={project.id}>
              <article className="border border-muted">
                {previewImage ? (
                  <Image
                    alt={projectTranslation.title}
                    width={400}
                    height={400}
                    src={previewImage}
                    className="aspect-square object-cover"
                  />
                ) : (
                  <div className="aspect-square bg-slate-100" />
                )}

                <div className="p-5">
                  <h2 className="mb-0 text-2xl">{!!projectTranslation ? projectTranslation.title : ''}</h2>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
