'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { IMAGE_ACCEPTED_FORMATS } from '@/app/[locale]/dashboard/_components/constants';
import { FileUploaderProps } from './types';
import { uploaderInfo } from './constants';
import { cn } from '@/lib/utils';

export const FileUploader = ({
  name,
  value,
  onChange,
  mode,
  type = 'image',
  accept = { 'image/*': IMAGE_ACCEPTED_FORMATS },
  isError,
  renderPreview,
}: FileUploaderProps) => {
  const [preview, setPreview] = useState<File[] | null>(value);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      switch (mode) {
        case 'single': {
          onChange([acceptedFiles[0]]);
          break;
        }
        case 'multiple': {
          const newFiles = preview ? [...preview, ...acceptedFiles] : acceptedFiles;
          onChange(newFiles);
          break;
        }
      }
    },
    [mode, onChange, preview],
  );

  const onPreviewFileDelete = (name: string): File[] | undefined => {
    const newFiles = preview?.filter((item) => item.name !== name);

    if (!newFiles) return;

    setPreview((prev) => {
      if (prev) {
        return newFiles;
      }
      return prev;
    });
    onChange(newFiles);
  };

  const onUpdateFile = (name: string, file: File) => {
    if (!preview) return;
    const newFiles = preview.map((prev) => {
      if (prev.name === name) {
        return file;
      }
      return prev;
    });

    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div
      className={cn('relative flex min-h-40 w-full flex-col justify-center border border-border p-6', {
        'border-primary': isDragActive,
        'border-red-700': isError,
      })}
      {...getRootProps()}
    >
      <input id={name} {...getInputProps()} />
      <div className="flex flex-col gap-6">
        <div className="flex select-none flex-col items-center gap-1">
          <p className="text-center font-medium">{uploaderInfo[type][mode].title}</p>
          <p className="text-center text-muted-foreground">{uploaderInfo[type][mode].description}</p>
        </div>
        {preview && renderPreview && renderPreview(preview, setPreview, onPreviewFileDelete, onUpdateFile)}
      </div>
    </div>
  );
};
