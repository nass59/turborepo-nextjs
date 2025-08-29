import { cn } from '@workspace/design-system/lib/utils';
import type { ComponentProps } from 'react';

export const Block = ({ children, className }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'relative block bg-gradient-to-br from-transparent via-purple-900/5 to-orange-950/20 px-12 py-24 md:h-dvh',
      className
    )}
  >
    {children}
  </div>
);
