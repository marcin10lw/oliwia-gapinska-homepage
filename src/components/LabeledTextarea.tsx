import { Label } from '@radix-ui/react-label';
import { Textarea, TextareaProps } from './ui/textarea';

interface LabeledTextareaProps extends TextareaProps {
  label: string;
  error?: string;
}

export const LabeledTextarea = ({ label, error, name, ...textareaProps }: LabeledTextareaProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <Label htmlFor={name} className="ml-[1px] text-xs uppercase">
        {label}
      </Label>
      <Textarea isError={!!error} id={name} {...textareaProps} />
      {!!error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
};
