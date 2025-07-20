"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { buttonVariants, cn } from "@workspace/ui";

import { routes } from "@/constants/routes";

type Props = {
  label: string;
  path: string;
};

export const MainNavItem = ({ label, path }: Props) => {
  const pathname = usePathname();
  const { spaceId } = useParams();

  const routeSpace = `${routes.dashboard}/${spaceId}`;
  const href = `${routeSpace}${path}`;

  const isActive =
    (pathname === routeSpace && href === routeSpace) ||
    pathname === href ||
    (pathname.startsWith(`${href}/`) && href !== routeSpace);

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        "text-muted-foreground flex w-full py-0 pr-0 pl-6",
        isActive && "text-foreground bg-slate-500/20 font-semibold"
      )}
    >
      <div className="flex py-4">{label}</div>

      <div
        className={cn(
          "ml-auto h-full rounded-md border-2 border-amber-300 opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};
