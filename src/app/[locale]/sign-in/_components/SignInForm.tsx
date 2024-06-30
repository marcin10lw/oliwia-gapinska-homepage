'use client';

import { LabeledInput } from '@/components/LabeledInput';
import { useSignIn } from './hooks/useSignIn.hook';
import { Button } from '@/components/ui/button';

export const SignInForm = () => {
  const {
    formik: { values, handleChange, handleSubmit, errors, touched, isSubmitting },
  } = useSignIn();

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col items-start gap-4">
          <LabeledInput
            value={values.email}
            onChange={handleChange}
            error={errors.email && touched.email ? errors.email : undefined}
            label="Email"
            type="email"
            required
            name="email"
          />
          <LabeledInput
            value={values.password}
            onChange={handleChange}
            error={errors.password && touched.password ? errors.password : undefined}
            label="Hasło"
            type="password"
            required
            name="password"
          />
        </div>
        <Button type="submit" className="mt-8 w-full" disabled={isSubmitting} isLoading={isSubmitting}>
          Zaloguj się
        </Button>
      </form>
    </div>
  );
};
