'use client';

import { ADD_PROJECT_LANG_PARAM_NAME } from '@/app/[locale]/dashboard/_components/constants';
import { AddProjectTranslationFields } from './schema/addProjectTranslationSchema.schema';
import { useAddProjectTranslation } from './hooks/useAddProjectTranslation';
import { Editor } from '@/app/[locale]/dashboard/_components';
import { LabeledInput } from '@/components/LabeledInput';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Button } from '@/components/ui/button';

export const AddProjectTranslationForm = ({
  initialValues,
  projectId,
}: {
  initialValues: AddProjectTranslationFields;
  projectId: number;
}) => {
  const { queryValue: langQuery } = useQueryParams(ADD_PROJECT_LANG_PARAM_NAME);
  const {
    formik: { values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting },
  } = useAddProjectTranslation(initialValues, projectId);
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
        <LabeledInput
          value={values.title}
          onChange={handleChange}
          error={errors.title && touched.title ? errors.title : undefined}
          label="Tytuł"
          placeholder="Tytuł"
          name="title"
        />
        <LabeledInput
          value={values.year}
          onChange={handleChange}
          error={errors.year && touched.year ? errors.year : undefined}
          label="Rok"
          placeholder="Rok"
          name="year"
          type="number"
        />
        <LabeledInput
          value={values.medium ?? undefined}
          onChange={handleChange}
          error={errors.medium && touched.medium ? errors.medium : undefined}
          label="Medium"
          placeholder="Medium"
          name="medium"
        />
        <LabeledInput
          value={values.dimensions ?? undefined}
          onChange={handleChange}
          error={errors.dimensions && touched.dimensions ? errors.dimensions : undefined}
          label="Wymiary"
          placeholder="Wymiary"
          name="dimensions"
        />
        <LabeledInput
          value={values.duration ?? undefined}
          onChange={handleChange}
          error={errors.duration && touched.duration ? errors.duration : undefined}
          label="Czas trwania"
          placeholder="Czas trwania"
          name="duration"
        />
        <div className="lg:col-span-2">
          <Editor
            label="Opis"
            triggerLabel="Podgląd"
            value={values.description}
            onChange={(value) => setFieldValue('description', value)}
            error={errors.description && touched.description ? errors.description : undefined}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          <span>
            Dodaj wersję <span className="uppercase">{langQuery}</span>
          </span>
        </Button>
      </div>
    </form>
  );
};
