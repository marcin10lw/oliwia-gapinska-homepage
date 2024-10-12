'use client';

import { CategoryTranslation } from '@prisma/client';
import { useFormik } from 'formik';

import { updateProjectCategory } from './actions/updateProjectCategory.action';
import { LabeledSelect } from '@/components/LabeledSelect';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export const ChangeProjectCategoryForm = ({
  categories,
  initialCategory,
  projectId,
}: {
  categories: CategoryTranslation[];
  initialCategory: string;
  projectId: number;
}) => {
  const { toast } = useToast();

  const { values, setFieldValue, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      categoryId: initialCategory,
    },
    onSubmit: async (values) => {
      const res = await updateProjectCategory(projectId, Number(values.categoryId));

      if (!res.ok) {
        toast({
          title: res.error,
          variant: 'destructive',
        });
        return;
      }

      if (res.ok) {
        toast({
          title: 'Zaktualizowano kategorię',
        });
        return;
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <LabeledSelect
        label="Kategoria"
        value={values.categoryId}
        onOptionChange={(value) => setFieldValue('categoryId', value)}
        options={categories.map((category) => ({ label: category.name, value: String(category.categoryId) }))}
      />
      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          <span>Zapisz</span>
        </Button>
      </div>
    </form>
  );
};
