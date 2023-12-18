import Image from "next/image"

import { type BillboardModel } from "@/lib/database/models/Billboard"

type Props = {
  data: BillboardModel
}

export const Billboard = ({ data }: Props) => {
  return (
    <div className="overflow-hidden">
      <div className="relative aspect-video overflow-hidden md:aspect-[2.4/1]">
        <Image
          src={data?.imageUrl}
          alt={data?.label}
          fill
          className="z-0 object-cover object-center brightness-[0.6]"
        />
        <div className="flex h-full w-full items-center justify-center">
          <div className="z-[1] max-w-xs font-heading text-4xl font-bold text-white sm:max-w-xl sm:text-5xl lg:text-6xl">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  )
}
