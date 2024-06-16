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
        'px-global-x-sm lg:px-global-x-lg',
        {
          'py-global-y-sm lg:py-global-y-lg': spaceY,
        },
        className,
      )}
      {...props}
    />
  );
};
