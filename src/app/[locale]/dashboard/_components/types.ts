import * as yup from 'yup';
import {
  projectBasicInformationSchema,
  projectImagesSchema,
  projectPreviewImageSchema,
  projectSchema,
  projectVideoSchema,
} from './schema/projectSchema.schema';

export type ProjectFields = yup.InferType<typeof projectSchema>;
export type ProjectBasicInformationFields = yup.InferType<typeof projectBasicInformationSchema>;
export type ProjectPreviewImage = yup.InferType<typeof projectPreviewImageSchema>;
export type ProjectImages = yup.InferType<typeof projectImagesSchema>;
export type ProjectVideo = yup.InferType<typeof projectVideoSchema>;
