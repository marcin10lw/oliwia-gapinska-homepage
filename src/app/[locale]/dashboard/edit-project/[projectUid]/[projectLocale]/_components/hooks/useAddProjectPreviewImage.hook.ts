'use client';

import { ProjectPreviewImage, projectPreviewImageSchema } from '@/app/[locale]/dashboard/_components';
import { useToast } from '@/components/ui/use-toast';
import { useFormik } from 'formik';

export const useAddProjectPreviewImage = () => {
  const { toast } = useToast();

  const formik = useFormik<ProjectPreviewImage>({
    initialValues: {
      previewImage: undefined,
    },
    validationSchema: projectPreviewImageSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      if (values.previewImage) {
        formData.append('previewImage', values.previewImage);
      }

      const res = await addProject(formData);

      if (!res.ok) {
        toast({
          title: res.error,
          variant: 'destructive',
        });
        return;
      }

      if (res.ok) {
        resetForm();
        toast({
          title: 'Utworzono nowy projekt',
        });
        return;
      }
    },
  });

  return { formik };
};
