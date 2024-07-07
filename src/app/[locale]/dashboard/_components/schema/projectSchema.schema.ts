import * as yup from 'yup';

import { IMAGE_ACCEPTED_FORMATS, IMAGE_MAX_SIZE, VIDEO_ACCEPTED_FORMATS, VIDEO_MAX_SIZE } from '../constants';
import { getFileSchema } from '@/lib/schema/fileSchema.schema';

export const projectBasicInformationSchema = yup.object().shape({
  category: yup.string().required(),
  language: yup.string().required(),
});

export const projectTranslationInformationSchema = yup.object().shape({
  title: yup.string().trim().required('Tytuł jest wymagany'),
  description: yup.string().trim().required('Opis jest wymagany'),
  year: yup.string().trim().required('Rok jest wymagany'),
  medium: yup.string().trim().nullable(),
  dimensions: yup.string().trim().nullable(),
  duration: yup.string().trim().nullable(),
});

export const projectPreviewImageSchema = yup.object().shape({
  previewImage: getFileSchema({
    size: { maxFileSize: IMAGE_MAX_SIZE, errorMessage: 'Maksymalny rozmiar to 5MB' },
    format: {
      errorMessage: 'Możesz dodać tylko zdjęcia',
      supportedFormats: IMAGE_ACCEPTED_FORMATS,
    },
  }).nullable(),
});

export const projectImagesSchema = yup.object().shape({
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
});

export const projectVideoSchema = yup.object().shape({
  video: getFileSchema({
    size: { maxFileSize: VIDEO_MAX_SIZE, errorMessage: 'Maksymalny rozmiar filmu to 50MB' },
    format: {
      errorMessage: 'Możesz dodać tylko filmy w formacie mp4',
      supportedFormats: VIDEO_ACCEPTED_FORMATS,
    },
  }).nullable(),
});

export const projectSchema = yup.object().shape({
  category: projectBasicInformationSchema.fields.category,
  language: projectBasicInformationSchema.fields.language,
  title: projectTranslationInformationSchema.fields.title,
  description: projectTranslationInformationSchema.fields.description,
  year: projectTranslationInformationSchema.fields.year,
  medium: projectTranslationInformationSchema.fields.medium,
  dimensions: projectTranslationInformationSchema.fields.dimensions,
  duration: projectTranslationInformationSchema.fields.duration,
  previewImage: projectPreviewImageSchema.fields.previewImage,
  images: projectImagesSchema.fields.images,
  video: projectVideoSchema.fields.video,
});
