import type { ComponentProps } from "react";

import { Separator } from "@workspace/design-system/components/ui/separator";
import { cn } from "@workspace/design-system/lib/utils";

type Props = ComponentProps<"div"> & {
  title: string;
  suffixTitle?: string;
  description?: string;
};

const Heading = ({
  title,
  suffixTitle,
  description,
  className,
  children,
  ...props
}: Props) => (
  <div className={cn("relative space-y-4", className)} {...props}>
    <h1
      className="font-heading flex items-center gap-2 text-4xl lg:text-5xl"
      {...props}
    >
      {title}
      {suffixTitle && (
        <span className="text-muted-foreground mt-1 text-3xl">
          {suffixTitle}
        </span>
      )}
    </h1>

    {description && (
      <p className="text-muted-foreground text-xl">{description}</p>
    )}

    {children}

    <Separator />
  </div>
);

const HeadingAction = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("absolute top-0 right-0", className)} {...props} />
);

export { Heading, HeadingAction };
