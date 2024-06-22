import { RedirectType, redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Language } from '@prisma/client';
import { Suspense } from 'react';

import { ProjectListSkeleton, ProjectsList } from './_components';
import { PaddingWrapper } from '@/components/PaddingWrapper';
import { Container } from '@/components/Container';
import { db } from '@/lib/prisma';

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
          <Suspense fallback={<ProjectListSkeleton />}>
            <ProjectsList categoryId={Number(id)} />
          </Suspense>
        </Container>
      </PaddingWrapper>
    </main>
  );
};

export default Page;
