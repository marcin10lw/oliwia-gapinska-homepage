import { PictureUploaderProps } from './PictureUploader';
import { PictureUploader } from './PictureUploader/PictureUploader';
import { Label } from './ui/label';

interface LabeledPictureUploaderProps extends PictureUploaderProps {
  label: string;
  error?: string;
  fileErrors?: string[];
}

export const LabeledPictureUploader = ({ label, error, fileErrors, ...uploaderProps }: LabeledPictureUploaderProps) => {
  return (
    <div className="flex w-full flex-col items-start">
      <Label htmlFor={uploaderProps.name} className="mb-2.5 ml-[1px] text-xs uppercase">
        {label}
      </Label>
      <PictureUploader {...uploaderProps} isError={!!error} fileErrors={fileErrors} />
      {!!error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
};
