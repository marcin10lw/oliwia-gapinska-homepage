import { ClassValue } from 'clsx';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps {
  children?: ReactNode;
  className?: ClassValue;
}

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn('mx-auto max-w-[71.25rem]', className)}>{children}</div>;
};
