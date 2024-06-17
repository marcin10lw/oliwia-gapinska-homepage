import { RedirectType, redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Language } from '@prisma/client';

import { db } from '@/lib/prisma';

const Page = async ({ params: { id } }: { params: { id?: string } }) => {
  if (!id || isNaN(Number(id))) {
    redirect('/', RedirectType.replace);
  }

  const locale = (await getLocale()) as Language['locale'];

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
    <div>
      {projects.map((project) => (
        <p key={project.id}>{project.translations[0].title}</p>
      ))}
    </div>
  );
};

export default Page;
