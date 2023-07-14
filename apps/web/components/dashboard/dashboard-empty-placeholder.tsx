import { cn } from "@shared/ui"

export const EmptyPlaceholder = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  )
}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mb-8 mt-3 text-center text-sm font-normal leading-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
