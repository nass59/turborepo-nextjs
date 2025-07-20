import Link from "next/link";
import { ExitIcon } from "@radix-ui/react-icons";

import { buttonVariants, cn } from "@workspace/ui";

import { routes } from "@/constants/routes";

export const NavbarActions = () => {
  return (
    <div className="flex">
      <Link
        href={routes.home}
        className={cn(buttonVariants({ variant: "brand", size: "xs" }))}
      >
        <ExitIcon className="mr-2 size-5" />
        Exit
      </Link>
    </div>
  );
};
