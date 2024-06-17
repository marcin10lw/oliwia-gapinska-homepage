import { Input, InputProps } from './ui/input';
import { Label } from './ui/label';

interface LabeledInputProps extends InputProps {
  label: string;
  error?: string;
}

export const LabeledInput = ({ label, error, name, ...inputProps }: LabeledInputProps) => {
  return (
    <div className="flex flex-col items-start">
      <Label htmlFor={name} className="mb-3 ml-[1px] text-xs uppercase">
        {label}
      </Label>
      <Input isError={!!error} id={name} {...inputProps} />
      {!!error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
};
