import { FileUploader, FileUploaderProps } from './FileUploader';
import { Label } from './ui/label';

interface LabeledFileUploaderProps extends FileUploaderProps {
  label: string;
  error?: string;
}

export const LabeledFileUploader = ({ label, error, ...uploaderProps }: LabeledFileUploaderProps) => {
  return (
    <div className="flex w-full flex-col items-start">
      <Label htmlFor={uploaderProps.name} className="mb-2.5 ml-[1px] text-xs uppercase">
        {label}
      </Label>
      <FileUploader {...uploaderProps} isError={!!error} />
      {!!error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
};
