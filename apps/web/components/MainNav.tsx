"use client";

import { cn } from "@lib/utils";
import { siteConfig } from "config/site";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import { MainNavItem } from "types";
import { Icons } from "./icons";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export const MainNav = ({ items, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:flex items-center space-x-2">
        <Icons.logo />
        <span className="font-bold inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden md:flex gap-6">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-sm text-slate-600 font-semibold",
                item.href.startsWith(`/${segment}`) && "text-slate-900",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>

      {showMobileMenu && <div>Menu mobile (todo)</div>}
    </div>
  );
};
