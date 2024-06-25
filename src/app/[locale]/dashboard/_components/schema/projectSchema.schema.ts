import { getFileSchema } from '@/lib/schema/fileSchema.schema';
import * as yup from 'yup';
import { IMAGE_ACCEPTED_FORMATS, IMAGE_MAX_SIZE } from '../constants';

export const projectSchema = yup.object().shape({
  category: yup.string().required(),
  language: yup.string().required(),
  title: yup.string().trim().required('title.error.required'),
  description: yup.string().trim().required('description.error.required'),
  year: yup.string().trim().required('year.error.required'),
  medium: yup.string().trim().nullable(),
  dimensions: yup.string().trim().nullable(),
  duration: yup.string().trim().nullable(),
  previewImage: getFileSchema({
    size: { maxFileSize: IMAGE_MAX_SIZE, errorMessage: 'previewImage.error.sizeExceeded' },
    format: {
      errorMessage: 'previewImage.error.wrongFormat',
      supportedFormats: IMAGE_ACCEPTED_FORMATS,
    },
  }).nullable(),
  images: yup
    .array()
    .of(
      getFileSchema({
        size: { maxFileSize: IMAGE_MAX_SIZE, errorMessage: 'images.error.sizeExceeded' },
        format: {
          errorMessage: 'images.error.wrongFormat',
          supportedFormats: IMAGE_ACCEPTED_FORMATS,
        },
      }).required(),
    )
    .nullable(),
});

export type ProjectFields = yup.InferType<typeof projectSchema>;
