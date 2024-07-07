'use client';

import { useFormik } from 'formik';

import { ADD_PROJECT_LANG_PARAM_NAME } from '@/app/[locale]/dashboard/_components/constants';
import { addProjectTranslation } from '../actions/addProjectTranslation.action';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useToast } from '@/components/ui/use-toast';
import {
  ProjectTranslationInformationFields,
  projectTranslationInformationSchema,
} from '@/app/[locale]/dashboard/_components';

export const useAddProjectTranslation = (
  initialValues: ProjectTranslationInformationFields,
  projectId: number,
  languageId: number,
) => {
  const { queryValue: langQuery } = useQueryParams(ADD_PROJECT_LANG_PARAM_NAME);
  const { toast } = useToast();

  const formik = useFormik<ProjectTranslationInformationFields>({
    initialValues: initialValues,
    validationSchema: projectTranslationInformationSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await addProjectTranslation(values, projectId, languageId);

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
          title: `Utworzono projekt w wersji: ${langQuery?.toUpperCase()}`,
        });
        return;
      }
    },
  });

  return { formik };
};
