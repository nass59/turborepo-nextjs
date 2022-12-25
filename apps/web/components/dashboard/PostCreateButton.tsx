"use client";

import { Icons } from "@components/icons";
import { cn } from "@lib/utils";
import { useRouter } from "next/navigation";

interface PostCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const PostCreateButton = ({
  className,
  ...props
}: PostCreateButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    // force cache invalidation
    router.refresh();
    router.push(`/editor/new-post`);
  };

  return (
    <button
      className={cn(
        "relative mt-1 inline-flex h-9 items-center rounded-md border border-transparent bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <Icons.add className="mr-2 h-4 w-4" />
      New post
    </button>
  );
};
