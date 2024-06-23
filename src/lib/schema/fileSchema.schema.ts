import * as yup from 'yup';
import { FileWithId } from '../types';

interface FileSchema {
  format: { supportedFormats: string[]; errorMessage: string };
  size: { maxFileSize: number; errorMessage: string };
}

export const getFileSchema = ({ size, format }: FileSchema) =>
  yup
    .mixed<FileWithId>()
    .test('fileSize', size.errorMessage, (value) => {
      if (value && value.file instanceof File) {
        return value.file.size < size.maxFileSize;
      }
      return true;
    })
    .test('fileFormat', format.errorMessage, (value) => {
      if (value && value.file instanceof File) {
        return format.supportedFormats.includes(`.${value.file.name.split('.').pop()}` || '');
      }
      return true;
    });
