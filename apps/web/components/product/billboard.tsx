import { type FC } from "react"

import { type Billboard as BillboardType } from "@/config/product"

interface BillboardProps {
  data: BillboardType
}

const Billboard: FC<BillboardProps> = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <div
        className="relative aspect-square overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1]"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <div className="max-w-xs font-heading text-4xl font-bold text-white sm:max-w-xl sm:text-5xl lg:text-6xl">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billboard
