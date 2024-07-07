'use server';

import { revalidatePath } from 'next/cache';

import { ProjectPreviewImage, projectPreviewImageSchema } from '../../../../../_components';
import { getPublicUrlOfFile, removePublicFile } from '@/lib/fileUpload';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { checkExistingUser } from '@/lib/checkExistingUser';
import { FileUploadResponse } from '@/lib/types';
import { validateForm } from '@/lib/utils';
import { db } from '@/lib/prisma';

export const addProjectPreviewImage = async (formData: FormData) => {
  const formFields = {
    previewImage: formData.get('previewImage'),
  } as ProjectPreviewImage;

  const validationRes = await validateForm<ProjectPreviewImage>(projectPreviewImageSchema, formFields);

  if ('error' in validationRes) {
    return { error: validationRes.error.errors[0] };
  }

  const validatedFields = validationRes.values;

  const existingUserRes = await checkExistingUser();

  if (!existingUserRes.ok) {
    return { ok: false, error: existingUserRes.error };
  }

  const { user } = existingUserRes;

  let previewImageUploadData: FileUploadResponse | null = null;

  if (!!validatedFields.previewImage) {
    previewImageUploadData = await getPublicUrlOfFile(validatedFields.previewImage, '/projects/previews');
  }

  try {
    const previewImage = previewImageUploadData
      ? await db.media.create({
          data: {
            path: previewImageUploadData.path,
            publicUrl: previewImageUploadData.publicUrl,
          },
        })
      : undefined;

    await db.project.create({
      data: {
        userId: user.id,
        categoryId: Number(validatedFields.category),
        previewImageId: previewImage ? previewImage.id : undefined,
      },
    });

    revalidatePath(FRONTEND_ROUTES.dashboard);
    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    console.log('ADD PROJECT ERROR:', error);
    if (previewImageUploadData) {
      await db.media.delete({
        where: {
          path: previewImageUploadData.path,
        },
      });
      await removePublicFile(previewImageUploadData.path);
    }

    for (const image of imagesUploadData) {
      await removePublicFile(image.path);
    }

    return { error: 'errors.internal' };
  }
};
