import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().email('email.error.invalid').required('email.error.required'),
  password: yup.string().required('email.error.required'),
});

export type SignInFields = yup.InferType<typeof signInSchema>;
