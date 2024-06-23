import * as yup from 'yup';

export const projectSchema = yup.object().shape({
  category: yup.string(),
  language: yup.string(),
  title: yup.string().required('title.error.required'),
  description: yup.string().required('description.error.required'),
  year: yup.string().required('year.error.required'),
  medium: yup.string(),
  dimensions: yup.string(),
  duration: yup.string(),
});

export type ProjectFields = yup.InferType<typeof projectSchema>;
