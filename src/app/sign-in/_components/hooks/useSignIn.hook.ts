'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';

import { SignInFields, signInSchema } from '@/lib/schema/signInSchema.schema';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { useToast } from '@/components/ui/use-toast';

export const useSignIn = () => {
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik<SignInFields>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await signIn('credentials', { ...values, redirect: false });
        if (res && !res.ok) {
          throw new Error(res.error ?? undefined);
        }
        router.replace(FRONTEND_ROUTES.dashboard);
        resetForm();
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: error.message,
            variant: 'destructive',
          });
        }
      }
    },
  });

  return { formik };
};
