'use client';

import { useRouter } from 'next/navigation';
import { Media } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import { ProjectVideo, projectVideoSchema } from '@/app/dashboard/_components';
import { VIDEO_ACCEPTED_FORMATS } from '@/app/dashboard/_components/constants';
import { LabeledFileUploader } from '@/components/LabeledFileUploader';
import { updateVideo } from './actions/updateVideo.action';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { getFileFromUrl } from '@/lib/utils';

export const EditVideoForm = ({ videoMedia, projectUid }: { videoMedia?: Media; projectUid: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const { values, setFieldValue, handleSubmit, errors, touched, isSubmitting } = useFormik<ProjectVideo>({
    initialValues: {
      video: null,
    },
    validationSchema: projectVideoSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      values.video && formData.append('video', values.video);

      const res = await updateVideo(formData, projectUid);

      if (!res.ok) {
        toast({
          title: res.error,
          variant: 'destructive',
        });
        return;
      }

      if (res.ok) {
        toast({
          title: `${videoMedia ? 'Zmieniono' : 'Zaktualizowano'} video`,
        });
        router.refresh();
        return;
      }
    },
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
        renderPreview={({ preview, onPreviewFileDelete }) => {
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
