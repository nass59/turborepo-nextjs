import { type PropsWithChildren } from "react";

import { cn } from "@workspace/design-system/lib/utils";

type Props = PropsWithChildren & {
  className?: string;
  centered?: boolean;
  withSpace?: boolean;
};

export const ContentContainer = ({
  className,
  centered = false,
  withSpace = true,
  children,
}: Props) => {
  return (
    <div
      className={cn(
        "relative container mx-auto py-6 lg:py-10",
        {
          "max-w-4xl": centered,
          "space-y-8": withSpace,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
