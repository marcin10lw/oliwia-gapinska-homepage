import * as yup from 'yup';

export const addProjectTranslationSchema = yup.object().shape({
  language: yup.string().required(),
  title: yup.string().trim().required('Tytuł jest wymagany'),
  description: yup.string().trim().required('Opis jest wymagany'),
  year: yup.string().trim().required('Rok jest wymagany'),
  medium: yup.string().trim().nullable(),
  dimensions: yup.string().trim().nullable(),
  duration: yup.string().trim().nullable(),
});

export type AddProjectTranslationFields = yup.InferType<typeof addProjectTranslationSchema>;
