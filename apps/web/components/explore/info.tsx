import { type ItemModel } from "@/lib/database/models/Item"
import { buttonVariants } from "@shared/ui"

interface InfoProps {
  data: ItemModel
}

const Info: React.FC<InfoProps> = ({ data }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex">
        <span className={buttonVariants({ size: "xs" })}>{data.category}</span>
      </div>
      <hr className="my-4" />
      <div className="mt-3 flex flex-col gap-4">
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

export default Info
