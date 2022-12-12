"use client";

import Link from "next/link";
import { MainNavItem } from "types";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export const MainNav = ({ items: children }: MainNavProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:flex items-center space-x-2">
        <span>YO</span>
        <span>YO</span>
      </Link>
      <div>Main Nav</div>
    </div>
  );
};
