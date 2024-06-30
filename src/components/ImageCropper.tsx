'use client';

import 'cropperjs/dist/cropper.css';
import { ReactNode, createRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';

import { dataUrlToFile } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface ImageCropperProps {
  image: File;
  triggerElement?: ReactNode;
  onSaveCroppedImage: (name: string, file: File) => void;
  modal: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const ImageCropper = ({ image, triggerElement, onSaveCroppedImage, modal }: ImageCropperProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const cropperRef = createRef<ReactCropperElement>();

  const imageSrc = URL.createObjectURL(image);

  const onSaveFile = async () => {
    const cropper = cropperRef.current?.cropper;

    if (!cropper) return;

    let quality = 1;

    while (true) {
      if (quality <= 0) break;
      const canvasDataURL = cropper.getCroppedCanvas().toDataURL('image/jpeg', quality);
      const file = await dataUrlToFile(canvasDataURL, image.name, 'image/jpeg');

      if (file.size <= image.size) {
        onSaveCroppedImage(image.name, file);
        break;
      }

      quality -= 0.01;
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        {!!triggerElement ? (
          triggerElement
        ) : (
          <Button className="z-10 inline-block cursor-pointer text-white" variant="link">
            Upload photo
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-5rem)] max-w-[71.25rem]">
        <DialogHeader>
          <DialogTitle className="m-0">{modal.title}</DialogTitle>
          <DialogDescription>{modal.description}</DialogDescription>
        </DialogHeader>

        <Cropper
          ref={cropperRef}
          src={imageSrc}
          viewMode={1}
          zoomTo={0}
          preview=".img-preview"
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          responsive={true}
          className="max-h-[calc(100vh-20rem)] min-h-96"
          autoCropArea={1}
          guides={true}
          checkOrientation={false}
        />

        <DialogFooter>
          <Button onClick={onSaveFile}>{modal.buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
