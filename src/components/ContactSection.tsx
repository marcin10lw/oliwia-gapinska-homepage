'use client';

import { useFormik } from 'formik';

import { ContactFields, contactSchema } from '@/lib/schema/contactSchema.schema';
import { LabeledTextarea } from './LabeledTextarea';
import { PaddingWrapper } from './PaddingWrapper';
import { LabeledInput } from './LabeledInput';
import { Container } from './Container';
import { Button } from './ui/button';

export const ContactSection = () => {
  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = useFormik<ContactFields>({
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
        <h2 className="mb-2.5">Skontaktuj się ze mną.</h2>
        <p className="text-muted-foreground">Zainteresowany/a współpracą? Wypełnij formularz kontaktowy.</p>
        <form onSubmit={handleSubmit} noValidate className="mt-10 max-w-[47.5rem]">
          <div className="grid gap-5 md:grid-cols-2">
            <LabeledInput
              value={values.name}
              onChange={handleChange}
              error={errors.name && touched.name ? errors.name : undefined}
              name="name"
              label="imię"
              required
            />
            <LabeledInput
              value={values.email}
              onChange={handleChange}
              error={errors.email && touched.email ? errors.email : undefined}
              name="email"
              type="email"
              label="email"
              required
            />
            <div className="md:col-span-2">
              <LabeledTextarea
                value={values.message}
                onChange={({ target }) => setFieldValue('message', target.value)}
                error={errors.message && touched.message ? errors.message : undefined}
                label="wiadomość"
                required
                className="min-h-36"
              />
            </div>
          </div>
          <Button className="mt-5" type="submit">
            Wyślij
          </Button>
        </form>
      </Container>
    </PaddingWrapper>
  );
};
