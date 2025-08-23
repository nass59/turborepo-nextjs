import Link from "next/link";
import { LogOutIcon } from "lucide-react";

import { buttonVariants } from "@workspace/design-system/components/ui/button";
import { cn } from "@workspace/design-system/lib/utils";

import { routes } from "@/constants/routes";

export const NavbarActions = () => {
  return (
    <div className="flex">
      <Link href={routes.home} className={cn(buttonVariants())}>
        <LogOutIcon className="mr-2 size-5" />
        Exit
      </Link>
    </div>
  );
};
