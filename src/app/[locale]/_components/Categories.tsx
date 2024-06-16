'use server';

import { Container } from '@/components/Container';
import { PaddingWrapper } from '@/components/PaddingWrapper';
import { db } from '@/lib/prisma';
import { Language } from '@prisma/client';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export const Categories = async () => {
  const locale = (await getLocale()) as Language['locale'];
  const categories = await db.category.findMany({
    where: {
      language: {
        locale,
      },
    },
  });

  return (
    <PaddingWrapper>
      <Container>
        {categories.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
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
