'use server';

import { revalidatePath } from 'next/cache';

import { ProjectImages, projectPreviewImageSchema } from '@/app/[locale]/dashboard/_components';
import { BUCKET_IMAGES_PREFIX } from '@/app/[locale]/dashboard/_components/constants';
import { getPublicUrlOfFile, removePublicFile } from '@/lib/fileUpload';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { FileUploadResponse } from '@/lib/types';
import { validateForm } from '@/lib/utils';
import { db } from '@/lib/prisma';

export const updateImages = async (formData: FormData, projectUid: string) => {
  const formFields = {
    images: formData.getAll('images'),
  } as ProjectImages;

  const validationRes = await validateForm(projectPreviewImageSchema, formFields);

  if ('error' in validationRes) {
    return { ok: false, error: validationRes.error.errors[0] };
  }

  const { images } = validationRes.values;

  try {
    const currentProject = await db.project.findUniqueOrThrow({
      where: { uid: projectUid },
      select: { images: true, id: true },
    });

    let imagesUploadData: FileUploadResponse[] = [];

    if (!!images) {
      for (const image of images) {
        const imageUploadData = await getPublicUrlOfFile(image, BUCKET_IMAGES_PREFIX);

        if (!imageUploadData) {
          for (const image of imagesUploadData) {
            await removePublicFile(image.path);
          }
          throw new Error();
        }

        if (imageUploadData) {
          imagesUploadData.push(imageUploadData);
        }
      }
    }

    await db.media.deleteMany({
      where: { projectId: currentProject.id },
    });

    await db.media.createMany({
      data: imagesUploadData.map((data) => ({ projectId: currentProject.id, ...data })),
    });

    for (const currentImage of currentProject.images) {
      await removePublicFile(currentImage.path);
    }

    revalidatePath(FRONTEND_ROUTES.dashboard);
    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    console.log('[UPDATE PROJECT IMAGES ERROR]:', error);
    return { ok: false, error: 'Coś poszło nie tak...' };
  }
};
