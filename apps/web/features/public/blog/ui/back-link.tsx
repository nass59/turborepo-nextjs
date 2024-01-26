import Link from "next/link"

import { buttonVariants, cn } from "@shared/ui"
import { Icons } from "@/components/icons"

type Props = {
  className?: string
}

export const BackLink = ({ className }: Props) => {
  return (
    <Link
      href="/blog"
      className={cn(buttonVariants({ variant: "ghost" }), className)}
    >
      <Icons.chevronLeft className="mr-2 size-4" />
      See all posts
    </Link>
  )
}
