import { getLocale } from 'next-intl/server';
import { Language } from '@prisma/client';
import { db } from '@/lib/prisma';
import Link from 'next/link';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';

export const ProjectsList = async ({ categoryId }: { categoryId: number }) => {
  const locale = (await getLocale()) as Language['locale'];

  const projects = await db.projectTranslation.findMany({
    where: {
      project: {
        categoryId,
      },
      language: {
        locale,
      },
    },
  });

  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={FRONTEND_ROUTES.project.replace(':id', String(project.id))}
            className="group flex aspect-square items-end bg-neutral-200"
          >
            <div className="flex h-full w-full items-end bg-gradient-to-b from-transparent to-neutral-500 p-5">
              <div>
                <h2 className="mb-0 text-2xl font-semibold text-white">{project.title}</h2>
                <dl className="flex items-center gap-1.5 text-sm capitalize text-white">
                  <dt>Medium:</dt>
                  <dd>{project.medium}</dd>
                </dl>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
