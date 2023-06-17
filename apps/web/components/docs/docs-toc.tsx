"use client"

import { useMemo } from "react"

import { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { useActiveItem } from "@/hooks/use-active-item"
import { useMounted } from "@/hooks/use-mounted"

interface DocsTableOfContentsProps {
  toc: TableOfContents
}

export const DocsTableOfContents = ({ toc }: DocsTableOfContentsProps) => {
  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
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

  return mounted ? (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string | null
}

const Tree = ({ tree, level = 1, activeItem }: TreeProps) => {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className="mt-0 pt-2">
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline",
                item.url === `#${activeItem}`
                  ? "font-medium text-primary"
                  : "text-sm text-muted-foreground hover:text-primary"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
