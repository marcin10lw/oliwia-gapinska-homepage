import { Trash } from 'lucide-react';
import Image from 'next/image';

import { FileWithId } from '@/lib/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const ImagePreview = ({
  image,
  error,
  onPreviewFileDelete,
}: {
  image: FileWithId;
  error?: string;
  onPreviewFileDelete: (id: string) => void;
}) => {
  return (
    <div className="w-20">
      <div
        key={image.id}
        className={cn('relative grid place-items-center border border-border', {
          'border-red-700': !!error,
        })}
      >
        <Image width={80} height={80} className="size-20 object-cover" src={URL.createObjectURL(image.file)} alt="" />
        <Button
          onClick={(event) => {
            event.stopPropagation();
            onPreviewFileDelete(image.id);
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
