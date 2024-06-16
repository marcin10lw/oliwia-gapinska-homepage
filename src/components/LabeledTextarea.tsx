import { Label } from '@radix-ui/react-label';
import { Textarea, TextareaProps } from './ui/textarea';

interface LabeledTextareaProps extends TextareaProps {
  label: string;
}

export const LabeledTextarea = ({ label, name, ...textareaProps }: LabeledTextareaProps) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <Label htmlFor={name} className="ml-[1px] text-xs uppercase">
        {label}
      </Label>
      <Textarea id={name} {...textareaProps} />
    </div>
  );
};
