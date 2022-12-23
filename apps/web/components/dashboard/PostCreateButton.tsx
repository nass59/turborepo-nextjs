import { Icons } from "@components/icons";
import { cn } from "@lib/utils";

interface PostCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const PostCreateButton = ({
  className,
  ...props
}: PostCreateButtonProps) => {
  return (
    <button
      className={cn(
        "relative inline-flex h-9 rounded-md border border-transparent bg-slate-900 text-white items-center mt-1 px-4 text-sm font-medium hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      <Icons.add className="mr-2 w-4 h-4" />
      New post
    </button>
  );
};
