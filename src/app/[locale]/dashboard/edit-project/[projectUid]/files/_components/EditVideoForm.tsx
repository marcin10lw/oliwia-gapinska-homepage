'use client';

import { Media } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import { ProjectVideo, projectVideoSchema } from '@/app/[locale]/dashboard/_components';
import { VIDEO_ACCEPTED_FORMATS } from '@/app/[locale]/dashboard/_components/constants';
import { LabeledFileUploader } from '@/components/LabeledFileUploader';
import { Button } from '@/components/ui/button';
import { getFileFromUrl } from '@/lib/utils';

export const EditVideoForm = ({ videoMedia }: { videoMedia?: Media }) => {
  const { values, setFieldValue, handleSubmit, errors, touched, isSubmitting } = useFormik<ProjectVideo>({
    initialValues: {
      video: null,
    },
    validationSchema: projectVideoSchema,
    onSubmit: async () => {},
  });

  useEffect(() => {
    if (videoMedia) {
      const initializePreviewImage = async () => {
        const file = await getFileFromUrl(videoMedia.publicUrl, videoMedia.path);
        setFieldValue('video', file);
      };

      initializePreviewImage();
    }
  }, [videoMedia, setFieldValue]);

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Zapisz
        </Button>
      </div>
    </form>
  );
};