import { cn } from "@lib/utils";
import Link from "next/link";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  disabled?: boolean;
}
export const Card = ({
  href,
  className,
  children,
  disabled,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-slate-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 [&>p]:text-slate-600 [&>h4]:!mt-0 [&>h3]:!mt-0">
          {children}
        </div>
      </div>
      {href && (
        <Link
          href={disabled ? "#" : href}
          className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
        >
          <span className="sr-only">view</span>
        </Link>
      )}
    </div>
  );
};
