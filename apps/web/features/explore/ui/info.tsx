import { type ItemModel } from "@/lib/database/models/Item"
import { buttonVariants } from "@shared/ui"

type Props = {
  data: ItemModel
}

export const Info = ({ data }: Props) => {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="flex">
        <span className={buttonVariants({ size: "xs" })}>{data.category}</span>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quos
          quibusdam, voluptate, voluptatibus quia, quae fugiat nostrum
          reprehenderit natus voluptas doloribus. Quisquam quos quibusdam,
          voluptate, voluptatibus quia, quae fugiat nostrum reprehenderit natus
          voluptas doloribus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quos
          quibusdam, voluptate, voluptatibus quia, quae fugiat nostrum
          reprehenderit natus voluptas doloribus.
        </p>
      </div>
    </div>
  )
}
