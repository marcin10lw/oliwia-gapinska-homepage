'use client';

import { useFormik } from 'formik';

import { ProjectFields, projectSchema } from '../../../_components';
import { addProject } from '../actions/addProject.action';

export const useAddProject = (initialValues?: Partial<ProjectFields>) => {
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
      ...(!!initialValues && initialValues),
    },
    validationSchema: projectSchema,
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
      values.previewImage && formData.append('previewImage', values.previewImage);
      if (values.images) {
        values.images.forEach((image) => {
          formData.append(`images`, image);
        });
      }

      await addProject(formData);
    },
  });

  return { formik };
};
