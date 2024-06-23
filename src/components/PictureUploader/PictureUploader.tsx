'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslations } from 'next-intl';
import { v4 } from 'uuid';

import { IMAGE_ACCEPTED_FORMATS } from '@/app/[locale]/dashboard/_components/constants';
import { ImageCropper } from '../ImageCropper';
import { ImagePreview } from '../ImagePreview';
import { PictureUploaderProps } from './types';
import { FileWithId } from '@/lib/types';
import { cn } from '@/lib/utils';

export const PictureUploader = ({
  name,
  initialPreview,
  onChange,
  mode,
  accept = { 'image/*': IMAGE_ACCEPTED_FORMATS },
  isError,
  fileErrors,
}: PictureUploaderProps) => {
  const [preview, setPreview] = useState<FileWithId[] | null>(initialPreview);
  const t = useTranslations(`general.pictureUploader.${mode}`);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const acceptedFilesWithId = acceptedFiles.map((file) => ({ file, id: v4() }));

      switch (mode) {
        case 'single': {
          setPreview([acceptedFilesWithId[0]]);
          onChange([acceptedFilesWithId[0]]);
          break;
        }
        case 'multiple': {
          const newFiles = preview ? [...preview, ...acceptedFilesWithId] : acceptedFilesWithId;
          setPreview(newFiles);
          onChange(newFiles);
          break;
        }
      }
    },
    [mode, onChange, preview],
  );

  const onPreviewFileDelete = (id: string) => {
    const newFiles = preview?.filter((item) => item.id !== id);

    if (!newFiles) return;

    setPreview((prev) => {
      if (prev) {
        return newFiles;
      }
      return prev;
    });

    onChange(newFiles);
  };

  const onSaveCroppedImage = (id: string, file: File) => {
    if (!preview) return;
    const newFiles = preview.map((prev) => {
      if (prev.id === id) {
        return {
          id,
          file,
        };
      }
      return prev;
    });

    setPreview(newFiles);
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
          <p className="font-medium">{t('title')}</p>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        {preview && preview.length > 0 && (
          <div className="flex flex-wrap items-start justify-center gap-5" onClick={(event) => event.stopPropagation()}>
            {preview.map((item, i) => (
              <ImageCropper
                key={item.id}
                image={item}
                onSaveCroppedImage={onSaveCroppedImage}
                triggerElement={
                  <div
                    className="cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <ImagePreview
                      image={item}
                      onPreviewFileDelete={onPreviewFileDelete}
                      error={fileErrors ? fileErrors[i] : undefined}
                    />
                  </div>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
