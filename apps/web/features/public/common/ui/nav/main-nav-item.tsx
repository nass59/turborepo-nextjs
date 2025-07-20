import Link from "next/link";

import { buttonVariants, cn } from "@workspace/ui";

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
      className={cn(buttonVariants({ variant: "ghost", size: "xs" }), {
        "text-foreground": isActive,
        "text-foreground/70": !isActive,
      })}
      {...props}
    >
      {item.title}
    </Link>
  );
};
