'use client';

import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { PaddingWrapper } from './PaddingWrapper';
import { LabeledInput } from './LabeledInput';
import { LabeledTextarea } from './LabeledTextarea';
import { Button } from './ui/button';

export const ContactSection = () => {
  const t = useTranslations('contactForm');

  return (
    <PaddingWrapper className="bg-muted">
      <Container>
        <h2 className="mb-2.5">{t('heading')}</h2>
        <p className="text-muted-foreground">{t('cta')}</p>
        <form className="mt-10 max-w-[47.5rem]">
          <div className="grid gap-5 md:grid-cols-2">
            <LabeledInput required label={t('name.label')} name="name" />
            <LabeledInput required label={t('email.label')} name="email" />
            <div className="md:col-span-2">
              <LabeledTextarea required className="min-h-36" label={t('message.label')} name="message" />
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
