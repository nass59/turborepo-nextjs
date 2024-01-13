import { cn } from "@shared/ui"

import { type TableOfContents } from "../utilities/toc"

type Props = {
  tree: TableOfContents
  level?: number
  activeItem?: string | null
}

export const Tree = ({ tree, level = 1, activeItem }: Props) => {
  if (!tree?.items?.length || level >= 3) return null

  return (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => (
        <li key={index} className="pt-2">
          <a
            href={item.url}
            className={cn(
              "inline-block no-underline",
              item.url === `#${activeItem}`
                ? "font-bold text-primary"
                : "text-sm text-muted-foreground hover:text-primary"
            )}
          >
            {item.title}
          </a>
          {item.items?.length ? (
            <Tree tree={item} level={level + 1} activeItem={activeItem} />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
