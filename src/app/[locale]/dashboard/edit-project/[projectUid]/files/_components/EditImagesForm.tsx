'use client';

import { Media } from '@prisma/client';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import { ProjectImages, projectImagesSchema } from '@/app/[locale]/dashboard/_components';
import { ImagePreviewCropper } from '@/components/ImagePreviewCropper';
import { LabeledFileUploader } from '@/components/LabeledFileUploader';
import { Button } from '@/components/ui/button';
import { getFileFromUrl } from '@/lib/utils';

export const EditImagesForm = ({ projectImagesMedia }: { projectImagesMedia?: Media[] }) => {
  const { values, setFieldValue, errors, isSubmitting } = useFormik<ProjectImages>({
    initialValues: {
      images: [],
    },
    validationSchema: projectImagesSchema,
    onSubmit: async () => {},
  });

  useEffect(() => {
    if (projectImagesMedia && projectImagesMedia.length > 0) {
      const initialImages: ProjectImages['images'] = [];

      const initializeInitialImages = async () => {
        for (const imageMedia of projectImagesMedia) {
          const file = await getFileFromUrl(imageMedia.publicUrl, imageMedia.path);
          initialImages.push(file);
        }
        setFieldValue('images', initialImages);
      };

      initializeInitialImages();
    }
  }, [projectImagesMedia, setFieldValue]);

  return (
    <form>
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
      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Zapisz
        </Button>
      </div>
    </form>
  );
};
