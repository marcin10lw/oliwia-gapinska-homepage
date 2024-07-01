'use server';

import { revalidatePath } from 'next/cache';

import { AddProjectTranslationFields, addProjectTranslationSchema } from '../schema/addProjectTranslationSchema.schema';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { validateForm } from '@/lib/utils';
import { db } from '@/lib/prisma';

export const addProjectTranslation = async (formFields: AddProjectTranslationFields, projectId: number) => {
  const validationRes = await validateForm<AddProjectTranslationFields>(addProjectTranslationSchema, formFields);

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
            languageId: Number(validatedFields.language),
          },
        },
      },
    });

    revalidatePath(FRONTEND_ROUTES.dashboard);
    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Coś poszło nie tak. Skontaktuj się z Marcinem ;)' };
  }
};
