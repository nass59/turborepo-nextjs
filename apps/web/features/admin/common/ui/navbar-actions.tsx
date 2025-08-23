import { buttonVariants } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';

import { routes } from '@/constants/routes';

export const NavbarActions = () => {
  return (
    <div className="flex">
      <Link className={cn(buttonVariants())} href={routes.home}>
        <LogOutIcon className="mr-2 size-5" />
        Exit
      </Link>
    </div>
  );
};
