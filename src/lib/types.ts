import { getPublicUrlOfFile } from './fileUpload';

export interface SelectOption {
  label: string;
  value: string;
}

export type FileUploadResponse = NonNullable<Awaited<ReturnType<typeof getPublicUrlOfFile>>>;
