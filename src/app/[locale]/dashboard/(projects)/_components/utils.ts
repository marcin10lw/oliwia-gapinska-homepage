'use server';

import { db } from '@/lib/prisma';

export const getDashboardProjects = async (userId: number) => {
  return await db.project.findMany({
    where: {
      userId: userId,
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
};
