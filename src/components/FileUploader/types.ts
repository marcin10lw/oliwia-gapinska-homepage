import { ReactNode } from 'react';
import { Accept } from 'react-dropzone';

export type FileUploaderProps = {
  name: string;
  onChange: (files: File[]) => void;
  value: File[] | null;
  mode: 'single' | 'multiple';
  type?: 'image' | 'video';
  accept?: Accept;
  isError?: boolean;
  renderPreview?: ({
    preview,
    onPreviewFileDelete,
    onUpdateFile,
  }: {
    preview: File[];
    onPreviewFileDelete: (name: string) => File[] | undefined;
    onUpdateFile: (name: string, file: File) => void;
  }) => ReactNode;
};
