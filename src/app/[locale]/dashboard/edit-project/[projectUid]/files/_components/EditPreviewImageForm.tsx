'use client';

import { useRouter } from 'next/navigation';
import { Media } from '@prisma/client';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import { ProjectPreviewImage, projectPreviewImageSchema } from '@/app/[locale]/dashboard/_components';
import { updatePreviewImage } from './actions/updatePreviewImage.action';
import { ImagePreviewCropper } from '@/components/ImagePreviewCropper';
import { LabeledFileUploader } from '@/components/LabeledFileUploader';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { getFileFromUrl } from '@/lib/utils';

export const EditPreviewImageForm = ({
  previewImageMedia,
  projectUid,
}: {
  previewImageMedia?: Media;
  projectUid: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const { values, setFieldValue, handleSubmit, errors, touched, isSubmitting } = useFormik<ProjectPreviewImage>({
    initialValues: {
      previewImage: null,
    },
    validationSchema: projectPreviewImageSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      values.previewImage && formData.append('previewImage', values.previewImage);

      const res = await updatePreviewImage(formData, projectUid);

      if (!res.ok) {
        toast({
          title: res.error,
          variant: 'destructive',
        });
        return;
      }

      if (res.ok) {
        toast({
          title: `${previewImageMedia ? 'Zmieniono' : 'Zaktualizowano'} zdjęcie poglądowe`,
        });
        router.refresh();
        return;
      }
    },
  });

  useEffect(() => {
    if (previewImageMedia) {
      const initializePreviewImage = async () => {
        const file = await getFileFromUrl(previewImageMedia.publicUrl, previewImageMedia.path);
        setFieldValue('previewImage', file);
      };

      initializePreviewImage();
    }
  }, [previewImageMedia, setFieldValue]);

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Zapisz
        </Button>
      </div>
    </form>
  );
};
