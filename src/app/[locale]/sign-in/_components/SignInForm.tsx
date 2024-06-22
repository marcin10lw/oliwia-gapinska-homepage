'use client';

import { useTranslations } from 'next-intl';

import { LabeledInput } from '@/components/LabeledInput';
import { useSignIn } from './hooks/useSignIn.hook';
import { Button } from '@/components/ui/button';

export const SignInForm = () => {
  const t = useTranslations('auth.signIn');
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
            error={errors.email && touched.email ? t(errors.email) : undefined}
            label={t('email.label')}
            type="email"
            required
            name="email"
          />
          <LabeledInput
            value={values.password}
            onChange={handleChange}
            error={errors.password && touched.password ? t(errors.password) : undefined}
            label={t('password.label')}
            type="password"
            required
            name="password"
          />
        </div>
        <Button type="submit" className="mt-8 w-full" disabled={isSubmitting} isLoading={isSubmitting}>
          {t('buttonText')}
        </Button>
      </form>
    </div>
  );
};
