import { type ItemModel } from "@/lib/database/models/Item"

import { Gallery } from "./gallery"
import { Info } from "./info"

type Props = {
  item: ItemModel
}

export const Item = ({ item }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12">
      <div className="sm:col-span-5 lg:col-span-5">
        <Gallery images={item.images || []} />
      </div>
      <div className="sm:col-span-7 lg:col-span-7">
        <Info data={item} />
      </div>
    </div>
  )
}
