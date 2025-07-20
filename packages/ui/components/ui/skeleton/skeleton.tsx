import { cn } from "../../../lib/utils";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("bg-primary/10 animate-pulse rounded-md", className)}
    {...props}
  />
);

export { Skeleton };
