'use server';

import { getLocale, getTranslations } from 'next-intl/server';
import { Language } from '@prisma/client';
import Link from 'next/link';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { PaddingWrapper } from '@/components/PaddingWrapper';
import { Container } from '@/components/Container';
import { db } from '@/lib/prisma';

export const Categories = async () => {
  const t = await getTranslations('home');
  const locale = (await getLocale()) as Language['locale'];

  const categories = await db.categoryTranslation.findMany({
    where: {
      language: {
        locale,
      },
    },
  });

  return (
    <PaddingWrapper>
      <Container>
        <h2>{t('categories.heading')}</h2>
        {categories.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={FRONTEND_ROUTES.category.replace(':id', String(category.categoryId))}
                  className="text-2xl capitalize underline transition-colors hover:text-muted-foreground"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories</p>
        )}
      </Container>
    </PaddingWrapper>
  );
};
