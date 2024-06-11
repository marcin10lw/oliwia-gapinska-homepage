import { cn } from '@/lib/utils';
import { ElementType, HTMLAttributes } from 'react';

interface PaddingWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export const PaddingWrapper = ({ as: Tag = 'section', className, ...props }: PaddingWrapperProps) => {
  return <Tag className={cn('lg:px-global-lg px-global-sm', className)} {...props} />;
};
