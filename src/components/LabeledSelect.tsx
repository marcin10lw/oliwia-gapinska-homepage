'use client';

import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Select } from './ui/select';
import { SelectOption } from '@/lib/types';
import { Label } from './ui/label';

interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  onOptionChange: (value: string) => void;
}

export const LabeledSelect = ({ label, options, value, onOptionChange }: SelectProps) => {
  return (
    <div className="flex flex-col items-start">
      <Label htmlFor={label} className="mb-2.5 ml-[1px] text-xs uppercase">
        {label}
      </Label>
      <Select value={value} onValueChange={onOptionChange}>
        <SelectTrigger className="relative w-full" id={label}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
