'use server';

import { revalidatePath } from 'next/cache';

import { projectPreviewImageSchema, ProjectVideo } from '@/app/dashboard/_components';
import { BUCKET_PREVIEW_IMAGE_PREFIX } from '@/app/dashboard/_components/constants';
import { getPublicUrlOfFile, removePublicFile } from '@/lib/fileUpload';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { validateForm } from '@/lib/utils';
import { db } from '@/lib/prisma';

export const updateVideo = async (formData: FormData, projectUid: string) => {
  const formFields = {
    video: formData.get('video'),
  } as ProjectVideo;

  const validationRes = await validateForm(projectPreviewImageSchema, formFields);

  if ('error' in validationRes) {
    return { ok: false, error: validationRes.error.errors[0] };
  }

  const { video } = validationRes.values;

  try {
    const currentProject = await db.project.findUniqueOrThrow({
      where: { uid: projectUid },
      select: { video: true },
    });

    if (video) {
      const previewImageUploadData = await getPublicUrlOfFile(video, BUCKET_PREVIEW_IMAGE_PREFIX, 'videos');
      if (!previewImageUploadData) throw Error();

      const { publicUrl, path } = previewImageUploadData;

      await db.project.update({
        where: { uid: projectUid },
        data: {
          video: {
            create: { publicUrl, path },
          },
        },
      });
    }

    if (currentProject.video) {
      await db.media.delete({ where: { id: currentProject.video.id } });
      await removePublicFile(currentProject.video.path, 'videos');
    }

    revalidatePath(FRONTEND_ROUTES.dashboard);
    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Coś poszło nie tak...' };
  }
};
