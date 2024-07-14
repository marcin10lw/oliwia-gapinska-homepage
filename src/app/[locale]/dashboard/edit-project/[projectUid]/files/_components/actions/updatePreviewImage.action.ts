'use server';

import { ProjectPreviewImage, projectPreviewImageSchema } from '@/app/[locale]/dashboard/_components';
import { BUCKET_PREVIEW_IMAGE_PREFIX } from '@/app/[locale]/dashboard/_components/constants';
import { getPublicUrlOfFile, removePublicFile } from '@/lib/fileUpload';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { db } from '@/lib/prisma';
import { FileUploadResponse } from '@/lib/types';
import { validateForm } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const updatePreviewImage = async (formData: FormData, projectUid: string) => {
  const formFields = {
    previewImage: formData.get('previewImage'),
  } as ProjectPreviewImage;

  const validationRes = await validateForm(projectPreviewImageSchema, formFields);

  if ('error' in validationRes) {
    return { ok: false, error: validationRes.error.errors[0] };
  }

  const { previewImage } = validationRes.values;

  try {
    const currentProject = await db.project.findUniqueOrThrow({
      where: { uid: projectUid },
      select: { previewImage: true },
    });

    if (previewImage) {
      const previewImageUploadData = await getPublicUrlOfFile(previewImage, BUCKET_PREVIEW_IMAGE_PREFIX);
      if (!previewImageUploadData) throw Error();

      const { publicUrl, path } = previewImageUploadData;

      await db.project.update({
        where: { uid: projectUid },
        data: {
          previewImage: {
            create: { publicUrl, path },
          },
        },
      });
    }

    if (currentProject.previewImage) {
      await db.media.delete({ where: { id: currentProject.previewImage.id } });
      await removePublicFile(currentProject.previewImage.path);
    }

    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Coś poszło nie tak...' };
  }
};
