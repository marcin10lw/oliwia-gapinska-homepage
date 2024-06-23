import { getLocale } from 'next-intl/server';

import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';
import { db } from '@/lib/prisma';

export const DashboardProjects = async () => {
  const session = await handleNoSessionRedirect();
  const locale = await getLocale();

  const projects = await db.projectTranslation.findMany({
    where: {
      project: {
        userId: session.user.id,
      },
      language: {
        locale,
      },
    },
  });

  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <article className="border border-muted">
                <div className="aspect-square bg-slate-100" />
                <div className="p-5">
                  <h2 className="mb-0 text-2xl">{project.title}</h2>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
