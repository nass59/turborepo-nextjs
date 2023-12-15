"use client"

import { useMemo } from "react"

import { useMounted } from "@/hooks/use-mounted"

import { useActiveItem } from "../hooks/use-active-item"
import { type TableOfContents } from "../utilities/toc"
import { Tree } from "./toc-tree"

type Props = {
  toc: TableOfContents
}

export const TOC = ({ toc }: Props) => {
  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map(({ url }) => url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )

  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items) {
    return null
  }

  if (!mounted) return null

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}
