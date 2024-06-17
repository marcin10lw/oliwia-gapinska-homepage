import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup.string().required('name.error.required'),
  email: yup.string().email('email.error.invalid').required('email.error.required'),
  message: yup.string().required('message.error.required'),
});

export type ContactFields = yup.InferType<typeof contactSchema>;
