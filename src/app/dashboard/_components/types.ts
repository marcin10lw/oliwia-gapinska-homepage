import * as yup from 'yup';
import {
  projectTranslationInformationSchema,
  projectImagesSchema,
  projectPreviewImageSchema,
  projectSchema,
  projectVideoSchema,
  projectBasicInformationSchema,
} from './schema/projectSchema.schema';

export type ProjectFields = yup.InferType<typeof projectSchema>;
export type ProjectBasicInformationFields = yup.InferType<typeof projectBasicInformationSchema>;
export type ProjectTranslationInformationFields = yup.InferType<typeof projectTranslationInformationSchema>;
export type ProjectPreviewImage = yup.InferType<typeof projectPreviewImageSchema>;
export type ProjectImages = yup.InferType<typeof projectImagesSchema>;
export type ProjectVideo = yup.InferType<typeof projectVideoSchema>;
