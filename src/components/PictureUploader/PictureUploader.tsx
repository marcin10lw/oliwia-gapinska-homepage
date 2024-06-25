'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { IMAGE_ACCEPTED_FORMATS } from '@/app/[locale]/dashboard/_components/constants';
import { cn } from '@/lib/utils';
import { ImageCropper } from '../ImageCropper';
import { ImagePreview } from '../ImagePreview';
import { PictureUploaderProps } from './types';

export const PictureUploader = ({
  name,
  initialPreview,
  onChange,
  mode,
  accept = { 'image/*': IMAGE_ACCEPTED_FORMATS },
  isError,
  fileErrors,
}: PictureUploaderProps) => {
  const [preview, setPreview] = useState<File[] | null>(initialPreview);
  const t = useTranslations(`general.pictureUploader.${mode}`);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      switch (mode) {
        case 'single': {
          setPreview([acceptedFiles[0]]);
          onChange([acceptedFiles[0]]);
          break;
        }
        case 'multiple': {
          const newFiles = preview ? [...preview, ...acceptedFiles] : acceptedFiles;
          setPreview(newFiles);
          onChange(newFiles);
          break;
        }
      }
    },
    [mode, onChange, preview],
  );

  const onPreviewFileDelete = (name: string) => {
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

  const onSaveCroppedImage = (name: string, file: File) => {
    if (!preview) return;
    const newFiles = preview.map((prev) => {
      if (prev.name === name) {
        return file;
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
                key={item.name}
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
