import { AddProjectForm } from './_components';
import { db } from '@/lib/prisma';

const Page = async () => {
  const caterogies = await db.categoryTranslation.findMany({
    where: {
      language: {
        locale: 'pl',
      },
    },
  });
  const languages = await db.language.findMany();
  const initialLanguageId = languages.find((language) => language.locale === 'pl')?.id ?? 1;
  const initialCategoryId = caterogies[0].categoryId;

  return (
    <div>
      <h2 className="mb-10 text-4xl">Nowy projekt</h2>
      <AddProjectForm
        categories={caterogies}
        languages={languages}
        initialLanguageId={String(initialLanguageId)}
        initialCategoryId={String(initialCategoryId)}
      />
    </div>
  );
};

export default Page;
