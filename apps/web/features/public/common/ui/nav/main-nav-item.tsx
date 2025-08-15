import Link from "next/link";

import { buttonVariants } from "@workspace/design-system/components/ui/button";
import { cn } from "@workspace/design-system/lib/utils";

import { type MainNavItem as TypeMainNavItem } from "@/types";

type Props = {
  item: TypeMainNavItem;
  isActive: boolean;
};

export const MainNavItem = ({ item, isActive, ...props }: Props) => {
  if (item.disabled) return null;

  return (
    <Link
      href={item.href}
      className={cn(buttonVariants({ variant: "ghost" }), {
        "text-foreground": isActive,
        "text-foreground/70": !isActive,
      })}
      {...props}
    >
      {item.title}
    </Link>
  );
};
