import { cn } from '@/lib/utils';
import { ElementType, HTMLAttributes } from 'react';

interface PaddingWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spaceY?: boolean;
}

export const PaddingWrapper = ({ as: Tag = 'section', className, spaceY = true, ...props }: PaddingWrapperProps) => {
  return (
    <Tag
      className={cn(
        'lg:px-global-x-lg px-global-x-sm',
        {
          'py-global-y-sm lg:py-global-y-lg': spaceY,
        },
        className,
      )}
      {...props}
    />
  );
};
