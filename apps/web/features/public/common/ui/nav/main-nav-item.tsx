import { buttonVariants } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
import Link from 'next/link';

import type { MainNavItem as TypeMainNavItem } from '@/types';

type Props = {
  item: TypeMainNavItem;
  isActive: boolean;
};

export const MainNavItem = ({ item, isActive, ...props }: Props) => {
  if (item.disabled) {
    return null;
  }

  return (
    <Link
      className={cn(buttonVariants({ variant: 'ghost' }), {
        'text-foreground': isActive,
        'text-foreground/70': !isActive,
      })}
      href={item.href}
      {...props}
    >
      {item.title}
    </Link>
  );
};
