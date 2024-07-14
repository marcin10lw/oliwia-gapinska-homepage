import { getLocale } from 'next-intl/server';
import { Language } from '@prisma/client';
import Link from 'next/link';

import { db } from '@/lib/prisma';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import Image from 'next/image';

export const ProjectsList = async ({ categoryUid }: { categoryUid: string }) => {
  const locale = (await getLocale()) as Language['locale'];

  const projectTranslations = await db.projectTranslation.findMany({
    where: {
      project: {
        category: { uid: categoryUid },
      },
      language: {
        locale,
      },
    },
    include: {
      project: {
        select: {
          previewImage: true,
        },
      },
    },
  });

  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {projectTranslations.map((projectTranslation) => {
        const projectPreviewImage = projectTranslation.project.previewImage?.publicUrl;
        return (
          <li key={projectTranslation.id}>
            <Link
              href={FRONTEND_ROUTES.project.replace(':projectUid', projectTranslation.uid)}
              className="group relative flex aspect-square items-end bg-neutral-200"
            >
              {projectPreviewImage && (
                <Image
                  width={400}
                  height={400}
                  src={projectPreviewImage}
                  alt={projectTranslation.title}
                  className="absolute h-full w-full object-cover"
                />
              )}
              <div className="z-[1] flex h-full w-full items-end bg-gradient-to-b from-transparent to-neutral-500 p-5">
                <div>
                  <h2 className="mb-0 text-2xl font-semibold text-white">{projectTranslation.title}</h2>
                  <dl className="flex items-center gap-1.5 text-sm capitalize text-white">
                    <dt>Medium:</dt>
                    <dd>{projectTranslation.medium}</dd>
                  </dl>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
