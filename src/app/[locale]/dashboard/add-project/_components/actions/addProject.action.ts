'use server';

import { revalidatePath } from 'next/cache';

import { getPublicUrlOfFile, removePublicFile } from '@/lib/fileUpload';
import { ProjectFields, projectSchema } from '../../../_components';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { checkExistingUser } from '@/lib/checkExistingUser';
import { FileUploadResponse } from '@/lib/types';
import { validateForm } from '@/lib/utils';
import { db } from '@/lib/prisma';

export const addProject = async (formData: FormData) => {
  const formFields = {
    category: formData.get('category'),
    language: formData.get('language'),
    title: formData.get('title'),
    year: formData.get('year'),
    medium: formData.get('medium'),
    dimensions: formData.get('dimensions'),
    duration: formData.get('duration'),
    description: formData.get('description'),
    previewImage: formData.get('previewImage'),
    video: formData.get('video'),
    images: formData.getAll('images'),
  } as ProjectFields;

  const validationRes = await validateForm<ProjectFields>(projectSchema, formFields);

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
  let videoUploadData: FileUploadResponse | null = null;
  let imagesUploadData: FileUploadResponse[] = [];

  if (!!validatedFields.previewImage) {
    previewImageUploadData = await getPublicUrlOfFile(validatedFields.previewImage, '/projects/previews');
  }

  if (!!validatedFields.video) {
    videoUploadData = await getPublicUrlOfFile(validatedFields.video, '/projects/videos', 'videos');
  }

  if (!!validatedFields.images) {
    for (const image of validatedFields.images) {
      const imageUploadData = await getPublicUrlOfFile(image, '/projects/images');
      if (imageUploadData) {
        imagesUploadData.push(imageUploadData);
      }
    }
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

    const video = videoUploadData
      ? await db.media.create({
          data: {
            path: videoUploadData.path,
            publicUrl: videoUploadData.publicUrl,
          },
        })
      : undefined;

    await db.project.create({
      data: {
        userId: user.id,
        categoryId: Number(validatedFields.category),
        previewImageId: previewImage ? previewImage.id : undefined,
        videoId: video ? video.id : undefined,
        images: imagesUploadData.length > 0 ? { createMany: { data: imagesUploadData } } : undefined,
        translations: {
          create: {
            languageId: Number(validatedFields.language),
            title: validatedFields.title,
            year: validatedFields.year,
            medium: validatedFields.medium,
            dimensions: validatedFields.dimensions,
            duration: validatedFields.duration,
            description: validatedFields.description,
          },
        },
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
