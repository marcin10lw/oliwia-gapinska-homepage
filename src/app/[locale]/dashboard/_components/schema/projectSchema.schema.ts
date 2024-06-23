import { getFileSchema } from '@/lib/schema/fileSchema.schema';
import * as yup from 'yup';
import { IMAGE_ACCEPTED_FORMATS, IMAGE_MAX_SIZE } from '../constants';

export const projectSchema = yup.object().shape({
  category: yup.string(),
  language: yup.string(),
  title: yup.string().required('title.error.required'),
  description: yup.string().required('description.error.required'),
  year: yup.string().required('year.error.required'),
  medium: yup.string(),
  dimensions: yup.string(),
  duration: yup.string(),
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
