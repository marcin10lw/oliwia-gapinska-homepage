import { projectSchema } from '@/app/dashboard/_components';
import * as yup from 'yup';

export const editProjectSchema = projectSchema.clone().shape({});

export type EditProjectFields = yup.InferType<typeof editProjectSchema>;
