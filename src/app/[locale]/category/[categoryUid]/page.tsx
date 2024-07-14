import { getLocale } from 'next-intl/server';
import { Language } from '@prisma/client';

import { PaddingWrapper } from '@/components/PaddingWrapper';
import { Container } from '@/components/Container';
import { ProjectsList } from './_components';
import { db } from '@/lib/prisma';

const Page = async ({ params: { categoryUid } }: { params: { categoryUid: string } }) => {
  const locale = (await getLocale()) as Language['locale'];

  const categoryName = (
    await db.categoryTranslation.findFirst({
      where: {
        category: { uid: categoryUid },
        language: {
          locale,
        },
      },
      select: {
        name: true,
      },
    })
  )?.name;

  return (
    <main>
      <PaddingWrapper>
        <Container>
          <h1 className="mb-10 text-4xl capitalize lg:mb-14">{categoryName}</h1>
          <ProjectsList categoryUid={categoryUid} />
        </Container>
      </PaddingWrapper>
    </main>
  );
};

export default Page;
