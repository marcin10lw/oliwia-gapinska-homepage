'use server';

import { ProjectBasicInformationFields, projectBasicInformationSchema } from '@/app/[locale]/dashboard/_components';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { checkExistingUser } from '@/lib/checkExistingUser';
import { revalidatePath } from 'next/cache';
import { validateForm } from '@/lib/utils';
import { db } from '@/lib/prisma';

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
  } as ProjectBasicInformationFields;

  const validationRes = await validateForm<ProjectBasicInformationFields>(projectBasicInformationSchema, formFields);

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
        project: {
          update: {
            categoryId: Number(validatedFields.category),
          },
        },
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
