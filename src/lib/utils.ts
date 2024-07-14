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

export const dataUrlToFile = async (url: string, fileName: string, mimeType: string) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return new File([buffer], fileName, { type: mimeType });
};

export const getFileFromUrl = async (fileUrl: string, fileName: string): Promise<File> => {
  const res = await fetch(fileUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};
