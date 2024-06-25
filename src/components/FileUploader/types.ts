import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Accept } from 'react-dropzone';

export type FileUploaderProps = {
  name: string;
  onChange: (files: File[]) => void;
  initialPreview: File[] | null;
  mode: 'single' | 'multiple';
  accept?: Accept;
  isError?: boolean;
  renderPreview?: (
    files: File[],
    setPreview: Dispatch<SetStateAction<File[] | null>>,
    onPreviewFileDelete: (name: string) => File[] | undefined,
    onUpdateFile: (name: string, file: File) => void,
  ) => ReactNode;
};
