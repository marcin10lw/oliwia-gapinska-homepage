'use server';

import { revalidatePath } from 'next/cache';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { db } from '@/lib/prisma';

export const updateProjectCategory = async (projectId: number, categoryId: number) => {
  try {
    await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        categoryId,
      },
    });

    revalidatePath(FRONTEND_ROUTES.dashboard);
    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Coś poszło nie tak...' };
  }
};
