import Link from "next/link";
import { RocketIcon } from "lucide-react";

import { buttonVariants } from "@workspace/design-system/components/ui/button";
import { cn } from "@workspace/design-system/lib/utils";

import { siteConfig } from "@/config/site";

export const Logo = ({ ...props }) => {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "hidden space-x-2 md:flex"
      )}
      {...props}
    >
      <RocketIcon className="size-6" />
      <span className="font-bold">{siteConfig.name}</span>
    </Link>
  );
};
