'use client';

import { CategoryTranslation, Language } from '@prisma/client';
import { useTranslations } from 'next-intl';

import { LabeledInput } from '@/components/LabeledInput';
import { LabeledPictureUploader } from '@/components/LabeledPictureUploader';
import { LabeledSelect } from '@/components/LabeledSelect';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Editor } from '../../_components';
import { useAddProject } from './hooks/useAddProject';

interface AddProjectFormProps {
  categories: CategoryTranslation[];
  languages: Language[];
  initialLanguageId: string;
  initialCategoryId: string;
}

export const AddProjectForm = ({
  categories,
  languages,
  initialLanguageId,
  initialCategoryId,
}: AddProjectFormProps) => {
  const t = useTranslations('dashboard.project');
  const {
    formik: { values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting },
  } = useAddProject({
    language: initialLanguageId,
    category: initialCategoryId,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
        <LabeledSelect
          label={t('category.label')}
          options={categories.map((category) => ({ label: category.name, value: String(category.categoryId) }))}
          value={values.category}
          onOptionChange={(value) => setFieldValue('category', value)}
        />
        <LabeledSelect
          label={t('language.label')}
          options={languages.map((language) => ({ label: language.locale, value: String(language.id) }))}
          value={values.language}
          onOptionChange={(value) => setFieldValue('language', value)}
        />
      </div>
      <Separator className="my-10" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
        <LabeledInput
          value={values.title}
          onChange={handleChange}
          error={errors.title && touched.title ? t(errors.title) : undefined}
          label={t('title.label')}
          placeholder={t('title.placeholder')}
          name="title"
        />
        <LabeledInput
          value={values.year}
          onChange={handleChange}
          error={errors.year && touched.year ? t(errors.year) : undefined}
          label={t('year.label')}
          placeholder={t('year.placeholder')}
          name="year"
          type="number"
        />
        <LabeledInput
          value={values.medium}
          onChange={handleChange}
          error={errors.medium && touched.medium ? t(errors.medium) : undefined}
          label={t('medium.label')}
          placeholder={t('medium.placeholder')}
          name="medium"
        />
        <LabeledInput
          value={values.dimensions}
          onChange={handleChange}
          error={errors.dimensions && touched.dimensions ? t(errors.dimensions) : undefined}
          label={t('dimensions.label')}
          placeholder={t('dimensions.placeholder')}
          name="dimensions"
        />
        <LabeledInput
          value={values.duration}
          onChange={handleChange}
          error={errors.duration && touched.duration ? t(errors.duration) : undefined}
          label={t('duration.label')}
          placeholder={t('duration.placeholder')}
          name="duration"
        />
        <div className="lg:col-span-2">
          <Editor
            label={t('description.label')}
            triggerLabel={t('description.triggerLabel')}
            value={values.description}
            onChange={(value) => setFieldValue('description', value)}
            error={errors.description && touched.description ? t(errors.description) : undefined}
          />
        </div>
        <div className="lg:col-span-2">
          <LabeledPictureUploader
            label={t('previewImage.label')}
            name="preview-image"
            initialPreview={values.previewImage ? [values.previewImage] : null}
            onChange={(files) => setFieldValue('previewImage', files[0])}
            error={errors.previewImage && touched.previewImage ? t(errors.previewImage) : undefined}
            mode="single"
          />
        </div>
        <div className="lg:col-span-2">
          <LabeledPictureUploader
            label={t('images.label')}
            name="images"
            initialPreview={values.images ? values.images : null}
            onChange={(files) => setFieldValue('images', files)}
            mode="multiple"
            fileErrors={
              errors.images && Array.isArray(errors.images) ? errors.images.map((error) => t(error)) : undefined
            }
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button type="submit">{t('submitButtonText')}</Button>
      </div>
    </form>
  );
};
