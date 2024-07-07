'use server';

import {
  ProjectTranslationInformationFields,
  projectTranslationInformationSchema,
} from '@/app/[locale]/dashboard/_components';
import { checkExistingUser } from '@/lib/checkExistingUser';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { db } from '@/lib/prisma';
import { validateForm } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const addProjectBasicInformation = async (formData: FormData, projectTranslationId: number) => {
  const formFields = {
    category: formData.get('category'),
    language: formData.get('language'),
    title: formData.get('title'),
    year: formData.get('year'),
    medium: formData.get('medium'),
    dimensions: formData.get('dimensions'),
    duration: formData.get('duration'),
    description: formData.get('description'),
  } as ProjectTranslationInformationFields;

  const validationRes = await validateForm<ProjectTranslationInformationFields>(
    projectTranslationInformationSchema,
    formFields,
  );

  if ('error' in validationRes) {
    return { error: validationRes.error.errors[0] };
  }

  const validatedFields = validationRes.values;

  const existingUserRes = await checkExistingUser();

  if (!existingUserRes.ok) {
    return { ok: false, error: existingUserRes.error };
  }

  const { user } = existingUserRes;

  try {
    await db.projectTranslation.update({
      where: {
        id: projectTranslationId,
      },
      data: {
        title: validatedFields.title,
        year: validatedFields.year,
        medium: validatedFields.medium,
        dimensions: validatedFields.dimensions,
        duration: validatedFields.duration,
        description: validatedFields.description,
      },
    });

    revalidatePath(FRONTEND_ROUTES.dashboard);
    revalidatePath(FRONTEND_ROUTES.category);
    return { ok: true };
  } catch (error) {
    console.log('ADD PROJECT ERROR:', error);
    return { error: 'Coś poszło nie tak...' };
  }
};
