import { forwardRef } from "react";

import { cn } from "../../../lib/utils";
import { Separator } from "../separator";

type HeadingProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  suffixTitle?: string;
  description?: string;
};

const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  ({ title, suffixTitle, description, className, children, ...props }, ref) => (
    <div className={cn("relative space-y-4", className)} ref={ref} {...props}>
      <h1
        className="font-heading flex items-center gap-2 text-4xl lg:text-5xl"
        ref={ref}
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
  )
);

Heading.displayName = "Heading";

const HeadingAction = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("absolute top-0 right-0", className)}
    ref={ref}
    {...props}
  />
));

HeadingAction.displayName = "HeadingAction";

export { Heading, HeadingAction };
