import * as yup from 'yup';

interface FileSchema {
  format: { supportedFormats: string[]; errorMessage: string };
  size: { maxFileSize: number; errorMessage: string };
}

export const getFileSchema = ({ size, format }: FileSchema) =>
  yup
    .mixed<File>()
    .test('fileSize', size.errorMessage, (value) => {
      if (value && value instanceof File) {
        return value.size < size.maxFileSize;
      }
      return true;
    })
    .test('fileFormat', format.errorMessage, (value) => {
      if (value && value instanceof File) {
        return format.supportedFormats.includes(`.${value.name.split('.').pop()}` || '');
      }
      return true;
    });
