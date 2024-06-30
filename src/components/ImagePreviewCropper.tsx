import { ImageCropper } from './ImageCropper';
import { ImagePreview } from './ImagePreview';

interface ImagePreviewCropperProps {
  file: File;
  error?: string;
  onSaveCroppedImage: (name: string, file: File) => void;
  onPreviewFileDelete: (name: string) => File[] | undefined;
  modal: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const ImagePreviewCropper = ({
  file,
  error,
  modal,
  onSaveCroppedImage,
  onPreviewFileDelete,
}: ImagePreviewCropperProps) => {
  return (
    <ImageCropper
      image={file}
      onSaveCroppedImage={onSaveCroppedImage}
      triggerElement={
        <div
          className="cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ImagePreview image={file} onPreviewFileDelete={onPreviewFileDelete} error={error} />
        </div>
      }
      modal={modal}
    />
  );
};
