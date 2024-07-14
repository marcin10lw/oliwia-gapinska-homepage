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

  const categoryTranslations = await db.categoryTranslation.findMany({
    where: {
      language: {
        locale,
      },
    },
    select: {
      uid: true,
      name: true,
      category: { select: { uid: true } },
    },
  });

  return (
    <PaddingWrapper>
      <Container>
        <h2>{t('categories.heading')}</h2>
        {categoryTranslations.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categoryTranslations.map((categoryTranslation) => (
              <li key={categoryTranslation.uid}>
                <Link
                  href={FRONTEND_ROUTES.category.replace(':categoryUid', categoryTranslation.category.uid)}
                  className="text-2xl capitalize underline transition-colors hover:text-muted-foreground"
                >
                  {categoryTranslation.name}
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
