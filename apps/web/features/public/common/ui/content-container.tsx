import { cn } from '@workspace/design-system/lib/utils';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
  centered?: boolean;
  withSpace?: boolean;
};

export const ContentContainer = ({
  className,
  centered = false,
  withSpace = true,
  children,
}: Props) => {
  return (
    <div
      className={cn(
        'container relative mx-auto py-6 lg:py-10',
        {
          'max-w-4xl': centered,
          'space-y-8': withSpace,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
