import Link from "next/link";

import { MainNavItem } from "types";

import { cn } from "@lib/utils";
import { useLockBody } from "@hooks/use-lock-body";
import { siteConfig } from "@config/site";
import { Icons } from "@components/icons";

interface MobileNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div className="fixed inset-0 top-16 z-50 h-[calc(100vh-4rem)] overflow-auto p-6 pb-32 shadow-md md:hidden slide-in-from-bottom-80 animate-in">
      <div className="relative z-20 grid gap-6 rounded-md bg-white p-4 shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <nav>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center w-full p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
