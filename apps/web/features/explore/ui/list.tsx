import { type ItemModel } from "@/lib/database/models/Item"
import { cn } from "@shared/ui"

import { NoResults } from "./no-results"
import { PosterCard } from "./poster-card"

type Props = {
  title: string
  items: ItemModel[]
  nbCols?: 4 | 5
}

const Items = ({ items, nbCols }: Pick<Props, "items" | "nbCols">) => {
  if (items.length === 0) return <NoResults />

  return (
    <div
      className={cn("grid gap-2", {
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4":
          nbCols === 4,
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5":
          nbCols === 5,
      })}
    >
      {items.map((item) => (
        <PosterCard key={item._id.toString()} data={item} />
      ))}
    </div>
  )
}

export const List = ({ title, items, nbCols = 4 }: Props) => {
  return (
    <div className="space-y-8">
      <h3 className="text-4xl font-bold">{title}</h3>
      <Items items={items} nbCols={nbCols} />
    </div>
  )
}
