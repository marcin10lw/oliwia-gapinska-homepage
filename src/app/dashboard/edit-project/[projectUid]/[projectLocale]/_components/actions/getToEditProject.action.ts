'use server';

import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';
import { db } from '@/lib/prisma';

export const getToEditProject = async (projectUid: string, projectLocale: string) => {
  const session = await handleNoSessionRedirect();
  return await db.projectTranslation.findFirst({
    where: {
      project: {
        uid: projectUid,
        userId: session.user.id,
      },
      language: {
        locale: projectLocale,
      },
    },
    include: {
      project: {
        select: {
          id: true,
          categoryId: true,
        },
      },
    },
  });
};
