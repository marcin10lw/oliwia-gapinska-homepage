'use server';

import { checkExistingUser } from '@/lib/checkExistingUser';
import { removePublicFile } from '@/lib/fileUpload';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const removeProject = async (projectId: number) => {
  const existingUserRes = await checkExistingUser();

  if (!existingUserRes.ok) return { ok: false, error: existingUserRes.error };

  try {
    const removedProject = await db.project.delete({
      where: {
        id: projectId,
        userId: existingUserRes.user.id,
      },
      include: {
        images: true,
        video: true,
      },
    });

    if (removedProject.previewImageId) {
      const removedPreviewImage = await db.media.delete({
        where: {
          id: removedProject.previewImageId,
        },
      });
      await removePublicFile(removedPreviewImage.path, 'images');
    }

    if (removedProject.images) {
      for (const image of removedProject.images) {
        const removedImage = await db.media.delete({
          where: {
            id: image.id,
          },
        });
        await removePublicFile(removedImage.path, 'images');
      }
    }

    if (removedProject.videoId) {
      const removedVideo = await db.media.delete({
        where: {
          id: removedProject.videoId,
        },
      });
      await removePublicFile(removedVideo.path, 'videos');
    }

    revalidatePath(FRONTEND_ROUTES.category);
    revalidatePath(FRONTEND_ROUTES.dashboard);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'errors.internal' };
  }
};
