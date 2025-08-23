import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@workspace/design-system/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

import { Sidebar } from './sidebar';

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent className="bg-background p-0" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
