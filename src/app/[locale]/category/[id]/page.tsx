import { RedirectType, redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Language } from '@prisma/client';

import { PaddingWrapper } from '@/components/PaddingWrapper';
import { Container } from '@/components/Container';
import { db } from '@/lib/prisma';
import { Link } from '@/lib/navigation';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';

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

  const projects = await db.project.findMany({
    where: {
      categoryId: Number(id),
    },
    include: {
      translations: {
        where: {
          language: {
            locale,
          },
        },
      },
    },
  });

  return (
    <main>
      <PaddingWrapper>
        <Container>
          <h1 className="mb-7 text-4xl capitalize">{categoryName}</h1>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={FRONTEND_ROUTES.project.replace(':id', String(project.id))}
                  className="group flex aspect-square items-end bg-neutral-200"
                >
                  <div className="invisible flex h-full w-full items-end bg-black/50 p-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">
                    <div>
                      <h2 className="mb-0 text-2xl font-semibold text-white">{project.translations[0].title}</h2>
                      <dl className="flex items-center gap-1.5 text-sm capitalize text-white">
                        <dt>Medium:</dt>
                        <dd>{project.translations[0].medium}</dd>
                      </dl>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </PaddingWrapper>
    </main>
  );
};

export default Page;
