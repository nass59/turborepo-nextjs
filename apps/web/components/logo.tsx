import Link from "next/link";
import { RocketIcon } from "@radix-ui/react-icons";

import { buttonVariants, cn } from "@workspace/design-system/components/ui";

import { siteConfig } from "@/config/site";

export const Logo = ({ ...props }) => {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "ghost", size: "xs" }),
        "hidden space-x-2 md:flex"
      )}
      {...props}
    >
      <RocketIcon className="size-6" />
      <span className="font-bold">{siteConfig.name}</span>
    </Link>
  );
};
