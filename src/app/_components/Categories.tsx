'use server';

import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { PaddingWrapper } from '@/components/PaddingWrapper';
import { Container } from '@/components/Container';
import { db } from '@/db';
import { CategoryTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getDynamicRoute } from '@/lib/navigation';

export const Categories = async () => {
  const categories = await db.query.CategoryTable.findMany({
    where: eq(CategoryTable.published, true),
  });

  return (
    <PaddingWrapper>
      <Container>
        <h2>Kategorie</h2>
        {categories.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.categoryId}>
                <Link
                  href={getDynamicRoute(FRONTEND_ROUTES.category, {
                    categoryId: category.categoryId,
                  })}
                  className="text-2xl capitalize underline transition-colors hover:text-muted-foreground"
                  prefetch
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak kategorii</p>
        )}
      </Container>
    </PaddingWrapper>
  );
};
