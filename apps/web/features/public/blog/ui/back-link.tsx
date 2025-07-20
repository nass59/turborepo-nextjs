import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { buttonVariants, cn } from "@workspace/design-system/components/ui";

type Props = {
  className?: string;
};

export const BackLink = ({ className }: Props) => {
  return (
    <Link
      href="/blog"
      className={cn(buttonVariants({ variant: "ghost" }), className)}
    >
      <ChevronLeftIcon className="mr-2 size-4" />
      See all posts
    </Link>
  );
};
