'use client';

import { useFormik } from 'formik';

import { ProjectBasicInformationFields, projectBasicInformationSchema } from '@/app/[locale]/dashboard/_components';
import { addProjectBasicInformation } from '../actions/addProjectBasicInformation.action';
import { EditedProjectBasicInformation } from '../types';
import { useToast } from '@/components/ui/use-toast';

export const useProjectBasicInformation = (
  initialValues: ProjectBasicInformationFields,
  projectTranslation: EditedProjectBasicInformation,
) => {
  const { toast } = useToast();

  const formik = useFormik<ProjectBasicInformationFields>({
    initialValues,
    validationSchema: projectBasicInformationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('category', values.category);
      formData.append('language', values.language);
      formData.append('title', values.title);
      formData.append('year', values.year);
      values.medium && formData.append('medium', values.medium);
      values.dimensions && formData.append('dimensions', values.dimensions);
      values.duration && formData.append('duration', values.duration);
      formData.append('description', values.description);

      const res = await addProjectBasicInformation(formData, projectTranslation.id);

      if (!res.ok) {
        toast({
          title: res.error,
          variant: 'destructive',
        });
        return;
      }

      if (res.ok) {
        toast({
          title: 'Zaktualizowano podstawowe informacje',
        });
        return;
      }
    },
  });

  return { formik };
};
