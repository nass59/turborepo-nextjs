'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import { CrossIcon, RocketIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type PropsWithChildren, useState } from 'react';
import type { MainNavItem as TypeMainNavItem } from 'types';

import { Logo } from '@/components/logo';

import { MainNavItems } from './main-nav-items';
import { MobileNav } from './mobile-nav';

type Props = PropsWithChildren & {
  items?: TypeMainNavItem[];
};

export const MainNav = ({ items, children }: Props) => {
  const pathName = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const toggle = () => setShowMobileMenu(!showMobileMenu);
  const close = () => setShowMobileMenu(false);

  return (
    <div className="flex gap-6">
      <Logo />

      <MainNavItems
        className="hidden gap-2 md:flex"
        items={items}
        pathName={pathName}
      />

      <Button className="space-x-2 md:hidden" onClick={toggle} variant="ghost">
        {showMobileMenu ? (
          <CrossIcon className="size-5" />
        ) : (
          <RocketIcon className="size-5" />
        )}
        <span className="font-bold">Menu</span>
      </Button>

      {showMobileMenu && items && (
        <MobileNav close={close} items={items} pathName={pathName}>
          {children}
        </MobileNav>
      )}
    </div>
  );
};
