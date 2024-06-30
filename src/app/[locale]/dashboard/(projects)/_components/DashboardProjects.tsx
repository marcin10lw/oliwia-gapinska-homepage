import Image from 'next/image';

import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';
import { ProjectDropdown } from './ProjectDropdown';
import { db } from '@/lib/prisma';

export const DashboardProjects = async () => {
  const session = await handleNoSessionRedirect();

  const projects = await db.project.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      previewImage: true,
      translations: {
        include: {
          language: true,
        },
      },
    },
  });

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <h2 className="mb-0 text-2xl text-muted-foreground">Nie masz jeszcze żadnego projektu</h2>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {projects.map((project) => {
          const projectTranslation = project.translations[0];
          const previewImage = project.previewImage?.publicUrl;

          return (
            <li key={project.id}>
              <article className="relative border border-muted shadow-md">
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
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {project.translations.map(({ language }) => (
                        <li
                          key={language.id}
                          className="grid size-6 place-items-center bg-black text-xs uppercase text-white"
                        >
                          {language.locale}
                        </li>
                      ))}
                    </div>
                    <ProjectDropdown projectId={project.id} />
                  </div>

                  <h2 className="mb-0 mt-4 text-2xl">{!!projectTranslation ? projectTranslation.title : ''}</h2>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
