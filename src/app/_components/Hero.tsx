import { Container } from '@/components/Container';
import { PaddingWrapper } from '@/components/PaddingWrapper';

export const Hero = () => {
  return (
    <PaddingWrapper className="pt-[6.25rem] lg:pt-[6.25rem]">
      <Container>
        <div className="text-center md:text-start">
          <p className="text-xl">Oliwia Gapińska</p>
          <p className="mt-1 text-muted-foreground">Artystka</p>
          <h1 className="mt-2.5 text-5xl leading-tight md:text-6xl">
            No hej! Jestem kreatywnym grafikiem i projektantem stron internetowych mieszkającym w słonecznym San
            Francisco w Kalifornii.
          </h1>
        </div>
      </Container>
    </PaddingWrapper>
  );
};
