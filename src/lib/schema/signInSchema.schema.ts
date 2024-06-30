import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
  password: yup.string().required('Hasło jest wymagane'),
});

export type SignInFields = yup.InferType<typeof signInSchema>;
