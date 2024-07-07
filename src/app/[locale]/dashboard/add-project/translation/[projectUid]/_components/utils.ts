'use server';

import { db } from '@/lib/prisma';

export const getExistingProject = async (userId: number, projectUid: string) => {
  return await db.project.findUnique({
    where: {
      uid: projectUid,
      userId,
    },
    include: {
      previewImage: true,
      images: true,
      video: true,
      translations: true,
      category: true,
    },
  });
};
