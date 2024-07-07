'use client';

import { CategoryTranslation, Language } from '@prisma/client';
import { Trash } from 'lucide-react';

import { ImagePreviewCropper } from '@/components/ImagePreviewCropper';
import { LabeledFileUploader } from '@/components/LabeledFileUploader';
import { VIDEO_ACCEPTED_FORMATS } from '../../_components/constants';
import { LabeledSelect } from '@/components/LabeledSelect';
import { LabeledInput } from '@/components/LabeledInput';
import { useAddProject } from './hooks/useAddProject';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Editor } from '../../_components';

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
  const {
    formik: { values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting },
  } = useAddProject({
    language: initialLanguageId,
    category: initialCategoryId,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <p className="mb-5 text-lg text-muted-foreground">
          1. Wybrana kategoria dotyczy wszystkich wersji językowych projektu
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          <LabeledSelect
            label="Kategoria"
            options={categories.map((category) => ({ label: category.name, value: String(category.categoryId) }))}
            value={values.category}
            onOptionChange={(value) => {
              setFieldValue('category', value);
            }}
          />
          <LabeledSelect
            label="Język"
            options={languages.map((language) => ({ label: language.locale, value: String(language.id) }))}
            value={values.language}
            onOptionChange={(value) => {
              setFieldValue('language', value);
            }}
          />
        </div>
      </div>
      <Separator className="my-10" />
      <div>
        <p className="mb-5 text-lg text-muted-foreground">2. Podstawowe informacje o projekcie</p>
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
      </div>
      <Separator className="my-10" />
      <div>
        <p className="mb-5 text-lg text-muted-foreground">3. Pliki projektu </p>
        <div className="grid gap-5 lg:gap-10">
          <LabeledFileUploader
            label="Zdjęcie podglądowe"
            name="preview-image"
            value={values.previewImage ? [values.previewImage] : null}
            onChange={(files) => setFieldValue('previewImage', files[0])}
            error={errors.previewImage && touched.previewImage ? errors.previewImage : undefined}
            mode="single"
            renderPreview={(preview, _, onPreviewFileDelete, onUpdateFile) => {
              return (
                preview &&
                preview.length > 0 && (
                  <div
                    className="flex flex-wrap items-start justify-center gap-5"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {preview.map((item) => (
                      <ImagePreviewCropper
                        key={item.name}
                        file={item}
                        onPreviewFileDelete={onPreviewFileDelete}
                        onSaveCroppedImage={onUpdateFile}
                        modal={{
                          title: 'Przytnij zdjęcie',
                          description: 'Dostosuj zdjęcie do swoich wymagań',
                          buttonText: 'Przytnij',
                        }}
                      />
                    ))}
                  </div>
                )
              );
            }}
          />
          <LabeledFileUploader
            label="Zdjęcia"
            name="images"
            value={values.images ? values.images : null}
            onChange={(files) => setFieldValue('images', files)}
            mode="multiple"
            renderPreview={(preview, _, onPreviewFileDelete, onUpdateFile) => {
              return (
                preview &&
                preview.length > 0 && (
                  <div
                    className="flex flex-wrap items-start justify-center gap-5"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {preview.map((item, i) => {
                      const fileError = errors.images && errors.images[i] ? errors.images[i] : undefined;
                      return (
                        <ImagePreviewCropper
                          key={item.name}
                          file={item}
                          onPreviewFileDelete={onPreviewFileDelete}
                          onSaveCroppedImage={onUpdateFile}
                          error={fileError}
                          modal={{
                            title: 'Przytnij zdjęcie',
                            description: 'Dostosuj zdjęcie do swoich wymagań',
                            buttonText: 'Przytnij',
                          }}
                        />
                      );
                    })}
                  </div>
                )
              );
            }}
          />

          <LabeledFileUploader
            label="Wideo"
            name="video"
            value={values.video ? [values.video] : null}
            onChange={(files) => setFieldValue('video', files[0])}
            error={errors.video && touched.video ? errors.video : undefined}
            mode="single"
            type="video"
            accept={{ 'video/*': VIDEO_ACCEPTED_FORMATS }}
            renderPreview={(preview, _, onPreviewFileDelete) => {
              const video = preview[0];
              return (
                video && (
                  <div className="flex flex-wrap items-start justify-center gap-5">
                    <div className="relative">
                      <video className="max-h-32" src={URL.createObjectURL(video)} />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          onPreviewFileDelete(video.name);
                        }}
                        className="absolute -right-2 -top-2 size-6 rounded-full p-[2px]"
                        variant="destructive"
                      >
                        <Trash className="size-3 text-white" />
                      </Button>
                    </div>
                  </div>
                )
              );
            }}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Dodaj projekt
        </Button>
      </div>
    </form>
  );
};
