import { Input, InputProps } from './ui/input';
import { Label } from './ui/label';

interface LabeledInputProps extends InputProps {
  label: string;
}

export const LabeledInput = ({ label, name, ...inputProps }: LabeledInputProps) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <Label htmlFor={name} className="ml-[1px] text-xs uppercase">
        {label}
      </Label>
      <Input id={name} {...inputProps} />
    </div>
  );
};
