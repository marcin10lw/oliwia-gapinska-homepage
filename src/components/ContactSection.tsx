'use client';

import { useTranslations } from 'next-intl';
import { useFormik } from 'formik';

import { ContactFields, contactSchema } from '@/lib/schema/contactSchema.schema';
import { LabeledTextarea } from './LabeledTextarea';
import { PaddingWrapper } from './PaddingWrapper';
import { LabeledInput } from './LabeledInput';
import { Container } from './Container';
import { Button } from './ui/button';

export const ContactSection = () => {
  const t = useTranslations('contactForm');

  const { values, handleChange, handleSubmit, errors, touched } = useFormik<ContactFields>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {},
  });

  return (
    <PaddingWrapper className="bg-muted">
      <Container>
        <h2 className="mb-2.5">{t('heading')}</h2>
        <p className="text-muted-foreground">{t('cta')}</p>
        <form onSubmit={handleSubmit} noValidate className="mt-10 max-w-[47.5rem]">
          <div className="grid gap-5 md:grid-cols-2">
            <LabeledInput
              value={values.name}
              onChange={handleChange}
              error={errors.name && touched.name ? t(errors.name) : undefined}
              name="name"
              label={t('name.label')}
              required
            />
            <LabeledInput
              value={values.email}
              onChange={handleChange}
              error={errors.email && touched.email ? t(errors.email) : undefined}
              name="email"
              type="email"
              label={t('email.label')}
              required
            />
            <div className="md:col-span-2">
              <LabeledTextarea
                value={values.message}
                onChange={handleChange}
                error={errors.message && touched.message ? t(errors.message) : undefined}
                label={t('message.label')}
                required
                className="min-h-36"
              />
            </div>
          </div>
          <Button className="mt-5" type="submit">
            {t('buttonText')}
          </Button>
        </form>
      </Container>
    </PaddingWrapper>
  );
};
