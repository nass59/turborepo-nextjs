import { buttonVariants } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
import { RocketIcon } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

export const Logo = ({ ...props }) => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'hidden space-x-2 md:flex'
      )}
      href="/"
      {...props}
    >
      <RocketIcon className="size-6" />
      <span className="font-bold">{siteConfig.name}</span>
    </Link>
  );
};
