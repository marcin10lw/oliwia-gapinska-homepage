'use client';

import { Editor, ProjectTranslationInformationFields } from '@/app/dashboard/_components';
import { LabeledInput } from '@/components/LabeledInput';
import { Button } from '@/components/ui/button';
import { useProjectBasicInformation } from './hooks/useProjectBasicInformation.hook';
import { EditedProjectBasicInformation } from './types';

export const EditBasicInformationForm = ({
  initialValues,
  projectTranslation,
}: {
  initialValues: ProjectTranslationInformationFields;
  projectTranslation: EditedProjectBasicInformation;
}) => {
  const {
    formik: { values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting },
  } = useProjectBasicInformation(initialValues, projectTranslation);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 lg:grid-cols-2">
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
          Zapisz
        </Button>
      </div>
    </form>
  );
};
