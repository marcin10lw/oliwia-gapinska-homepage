import { getLocale, getTranslations } from 'next-intl/server';
import { AddProjectForm } from './_components';
import { db } from '@/lib/prisma';

const Page = async () => {
  const t = await getTranslations('dashboard.project');

  const locale = await getLocale();

  const caterogies = await db.categoryTranslation.findMany({
    where: {
      language: {
        locale,
      },
    },
  });

  const languages = await db.language.findMany();

  const initialLanguageId = languages.find((language) => language.name === locale)?.id;

  const initialCategoryId = String(caterogies[0].categoryId);

  return (
    <div>
      <h2 className="mb-8 text-4xl">{t('addProjectHeading')}</h2>
      <AddProjectForm
        categories={caterogies}
        languages={languages}
        initialLanguageId={initialLanguageId ? String(initialLanguageId) : '1'}
        initialCategoryId={initialCategoryId}
      />
    </div>
  );
};

export default Page;
