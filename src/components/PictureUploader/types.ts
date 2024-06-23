import { Accept } from 'react-dropzone';

import { FileWithId } from '@/lib/types';

export type PictureUploaderProps = {
  name: string;
  onChange: (files: FileWithId[]) => void;
  initialPreview: FileWithId[] | null;
  mode: 'single' | 'multiple';
  accept?: Accept;
  isError?: boolean;
  fileErrors?: string[];
};
