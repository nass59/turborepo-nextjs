import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"

import { buttonVariants, cn } from "@shared/ui"

import { getPagerForDoc } from "../utilities/pager"

type Props = {
  url: string
}

export const Pager = ({ url }: Props) => {
  const pager = getPagerForDoc(url)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {/* Prev */}
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: "ghost" })}
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          {pager.prev.title}
        </Link>
      )}

      {/* Next */}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
        >
          {pager.next.title}
          <ArrowRightIcon className="ml-2 size-4" />
        </Link>
      )}
    </div>
  )
}
