'use server';

import { db } from '@/lib/prisma';

export const getExistingProject = async (userId: number, projectId: number) => {
  return await db.project.findUnique({
    where: {
      id: projectId,
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
