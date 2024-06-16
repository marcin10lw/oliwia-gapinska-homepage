import { Container } from '@/components/Container';
import { PaddingWrapper } from '@/components/PaddingWrapper';
import { getTranslations } from 'next-intl/server';

export const Hero = async () => {
  const t = await getTranslations('home.hero');

  return (
    <PaddingWrapper className="pt-[6.25rem] lg:pt-[6.25rem]">
      <Container>
        <div className="text-center md:text-start">
          <p className="text-xl">Oliwia Gapińska</p>
          <p className="mt-1 text-muted-foreground">{t('personDescription')}</p>
          <h1 className="mt-2.5 text-5xl leading-tight md:text-6xl">{t('heading')}</h1>
        </div>
      </Container>
    </PaddingWrapper>
  );
};
