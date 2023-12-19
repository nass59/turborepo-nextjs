import { type ItemModel } from "@/lib/database/models/Item"
import { parseData } from "@/lib/utils"

import { ExploreCard } from "./card"
import { NoResults } from "./no-results"

type Props = {
  title: string
  items: ItemModel[]
}

const Items = ({ items }: Pick<Props, "items">) => {
  if (items.length === 0) return <NoResults />

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ExploreCard key={item._id.toString()} data={parseData(item)} />
      ))}
    </div>
  )
}

export const List = ({ title, items }: Props) => {
  return (
    <div className="space-y-8">
      <h3 className="text-4xl font-bold">{title}</h3>
      <Items items={items} />
    </div>
  )
}
