import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup.string().required('Pole wymagane'),
  email: yup.string().email('Nieprawidłowy email').required('Pole wymagane'),
  message: yup.string().required('Pole wymagane'),
});

export type ContactFields = yup.InferType<typeof contactSchema>;
