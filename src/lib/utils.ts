import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Schema, ValidationError } from 'yup';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const validateForm = async <T extends object>(
  schema: Schema,
  formData: T,
): Promise<{ values: T } | { error: ValidationError }> => {
  try {
    const values = (await schema.validate(formData)) as T;
    return { values };
  } catch (error) {
    return { error } as { error: ValidationError };
  }
};
