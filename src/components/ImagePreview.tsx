import { Trash } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export const ImagePreview = ({
  image,
  error,
  onPreviewFileDelete,
}: {
  image: File;
  error?: string;
  onPreviewFileDelete: (name: string) => void;
}) => {
  return (
    <div className="w-20">
      <div
        key={image.name}
        className={cn('relative grid place-items-center border border-border', {
          'border-red-700': !!error,
        })}
      >
        <Image width={80} height={80} className="aspect-square object-cover" src={URL.createObjectURL(image)} alt="" />
        <Button
          onClick={(event) => {
            event.stopPropagation();
            onPreviewFileDelete(image.name);
          }}
          className="absolute -right-2 -top-2 size-6 rounded-full p-[2px]"
          variant="destructive"
        >
          <Trash className="size-3 text-white" />
        </Button>
      </div>
      {!!error && <p className="mt-1 break-words text-[0.625rem] text-red-700">{error}</p>}
    </div>
  );
};
