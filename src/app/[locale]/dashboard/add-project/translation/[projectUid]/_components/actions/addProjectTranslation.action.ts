'use server';

import { revalidatePath } from 'next/cache';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { validateForm } from '@/lib/utils';
import { db } from '@/lib/prisma';
import {
  ProjectTranslationInformationFields,
  projectTranslationInformationSchema,
} from '@/app/[locale]/dashboard/_components';

export const addProjectTranslation = async (
  formFields: ProjectTranslationInformationFields,
  projectId: number,
  languageId: number,
) => {
  const validationRes = await validateForm<ProjectTranslationInformationFields>(
    projectTranslationInformationSchema,
    formFields,
  );

  if ('error' in validationRes) {
    return { error: validationRes.error.errors[0] };
  }

  const { values: validatedFields } = validationRes;

  try {
    await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        translations: {
          create: {
            title: validatedFields.title,
            year: validatedFields.year,
            medium: validatedFields.medium,
            dimensions: validatedFields.dimensions,
            duration: validatedFields.duration,
            description: validatedFields.description,
            languageId: languageId,
          },
        },
      },
    });

    revalidatePath(FRONTEND_ROUTES.dashboard);
    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Coś poszło nie tak...' };
  }
};
