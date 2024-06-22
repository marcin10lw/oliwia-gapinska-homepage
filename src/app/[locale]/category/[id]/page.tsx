import { Language } from '@prisma/client';
import { getLocale } from 'next-intl/server';
import { RedirectType, redirect } from 'next/navigation';

import { Container } from '@/components/Container';
import { PaddingWrapper } from '@/components/PaddingWrapper';
import { db } from '@/lib/prisma';
import { ProjectsList } from './_components';

const Page = async ({ params: { id } }: { params: { id?: string } }) => {
  if (!id || isNaN(Number(id))) {
    redirect('/', RedirectType.replace);
  }

  const locale = (await getLocale()) as Language['locale'];

  const categoryName = (
    await db.categoryTranslation.findFirst({
      where: {
        categoryId: Number(id),
        language: {
          locale,
        },
      },
    })
  )?.name;

  return (
    <main>
      <PaddingWrapper>
        <Container>
          <h1 className="mb-7 text-4xl capitalize">{categoryName}</h1>
          <ProjectsList categoryId={Number(id)} />
        </Container>
      </PaddingWrapper>
    </main>
  );
};

export default Page;
