import * as React from "react";
import { cn } from "@lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Callout } from "@components/docs/callout";

const mdxComponents = {
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-b-slate-200 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <h1
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  Callout,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <div className="mdx">
      <MDXContent components={mdxComponents} />
    </div>
  );
}
