'use client';

import { useFormik } from 'formik';

import { ProjectFields, projectSchema } from '../../../_components';

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
      console.log(values);
    },
  });

  return { formik };
};
