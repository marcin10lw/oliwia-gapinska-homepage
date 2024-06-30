'use client';

import { useTranslations } from 'next-intl';
import { useFormik } from 'formik';

import { ProjectFields, projectSchema } from '../../../_components';
import { addProject } from '../actions/addProject.action';
import { useToast } from '@/components/ui/use-toast';

export const useAddProject = (initialValues?: Partial<ProjectFields>) => {
  const t = useTranslations('dashboard.project');

  const { toast } = useToast();

  const formik = useFormik<ProjectFields>({
    initialValues: {
      category: '',
      language: '',
      title: '',
      description: '',
      year: '',
      dimensions: '',
      duration: '',
      medium: '',
      previewImage: null,
      images: null,
      video: null,
      ...(!!initialValues && initialValues),
    },
    validationSchema: projectSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('category', values.category);
      formData.append('language', values.language);
      formData.append('title', values.title);
      formData.append('year', values.year);
      values.medium && formData.append('medium', values.medium);
      values.dimensions && formData.append('dimensions', values.dimensions);
      values.duration && formData.append('duration', values.duration);
      formData.append('description', values.description);
      values.previewImage && formData.append('previewImage', values.previewImage);
      values.video && formData.append('video', values.video);
      if (values.images) {
        values.images.forEach((image) => {
          formData.append(`images`, image);
        });
      }

      const res = await addProject(formData);

      if (!res.ok) {
        toast({
          title: t(res.error),
          variant: 'destructive',
        });
        return;
      }

      if (res.ok) {
        resetForm();
        toast({
          title: t('toast.projectAddedSuccess'),
        });
        return;
      }
    },
  });

  return { formik };
};
