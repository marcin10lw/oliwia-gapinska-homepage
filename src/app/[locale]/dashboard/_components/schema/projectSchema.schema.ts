import { getFileSchema } from '@/lib/schema/fileSchema.schema';
import * as yup from 'yup';
import { IMAGE_ACCEPTED_FORMATS, IMAGE_MAX_SIZE, VIDEO_ACCEPTED_FORMATS, VIDEO_MAX_SIZE } from '../constants';

export const projectSchema = yup.object().shape({
  category: yup.string().required(),
  language: yup.string().required(),
  title: yup.string().trim().required('Tytuł jest wymagany'),
  description: yup.string().trim().required('Opis jest wymagany'),
  year: yup.string().trim().required('Rok jest wymagany'),
  medium: yup.string().trim().nullable(),
  dimensions: yup.string().trim().nullable(),
  duration: yup.string().trim().nullable(),
  previewImage: getFileSchema({
    size: { maxFileSize: IMAGE_MAX_SIZE, errorMessage: 'Maksymalny rozmiar to 5MB' },
    format: {
      errorMessage: 'Możesz dodać tylko zdjęcia',
      supportedFormats: IMAGE_ACCEPTED_FORMATS,
    },
  }).nullable(),
  images: yup
    .array()
    .of(
      getFileSchema({
        size: { maxFileSize: IMAGE_MAX_SIZE, errorMessage: 'Maksymalny rozmiar jednego zdjęcia to 5MB' },
        format: {
          errorMessage: 'Możesz dodać tylko zdjęcia',
          supportedFormats: IMAGE_ACCEPTED_FORMATS,
        },
      }).required(),
    )
    .nullable(),
  video: getFileSchema({
    size: { maxFileSize: VIDEO_MAX_SIZE, errorMessage: 'Maksymalny rozmiar filmu to 50MB' },
    format: {
      errorMessage: 'Możesz dodać tylko filmy w formacie mp4',
      supportedFormats: VIDEO_ACCEPTED_FORMATS,
    },
  }).nullable(),
});

export type ProjectFields = yup.InferType<typeof projectSchema>;
