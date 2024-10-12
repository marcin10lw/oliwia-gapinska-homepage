import { PaddingWrapper } from '@/components/PaddingWrapper';
import { Container } from '@/components/Container';
import { db } from '@/db';
import { CategoryTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/lib/navigation';
import { ProjectsList } from './_components';

const Page = async ({ params: { categoryId } }: { params: { categoryId: string } }) => {
  const category = await db.query.CategoryTable.findFirst({
    where: eq(CategoryTable.categoryId, categoryId),
    with: {
      projects: {
        with: {
          previewImage: true,
          images: {
            with: {
              image: true,
            },
          },
        },
      },
    },
  });

  if (!category) redirect(FRONTEND_ROUTES.home);

  return (
    <main>
      <PaddingWrapper>
        <Container>
          <h1 className="mb-10 text-4xl capitalize lg:mb-14">{category.name}</h1>
          <ProjectsList projects={category.projects} />
        </Container>
      </PaddingWrapper>
    </main>
  );
};

export default Page;
