import { Accept } from 'react-dropzone';

export type PictureUploaderProps = {
  name: string;
  onChange: (files: File[]) => void;
  initialPreview: File[] | null;
  mode: 'single' | 'multiple';
  accept?: Accept;
  isError?: boolean;
  fileErrors?: string[];
};
