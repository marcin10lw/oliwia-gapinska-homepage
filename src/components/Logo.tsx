import { ClassValue } from 'clsx';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: ClassValue }) => {
  return (
    <Link
      href="/"
      className={cn('border-b-[2.5px] border-b-primary pb-[0.125rem] text-base font-semibold sm:text-xl', className)}
    >
      Oliwia Gapińska
    </Link>
  );
};
