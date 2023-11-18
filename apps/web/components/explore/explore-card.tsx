"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { type ItemModel } from "@/lib/database/models/Item"
import IconButton from "@/components/explore/icon-button"
import { Icons } from "@/components/icons"

interface ExploreCardProps {
  data: ItemModel
}

const ExploreCard: React.FC<ExploreCardProps> = ({ data }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/explore/${data._id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer space-y-3 rounded-xl border bg-white"
    >
      {/* Image */}
      <div className="relative aspect-square rounded-xl bg-gray-100">
        <Image
          src={data?.images?.[0] || ""}
          alt="Image"
          fill
          className="aspect-square rounded-b-none rounded-t-md object-cover"
        />
        <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
          <div className="flex justify-center gap-x-6">
            <IconButton
              onClick={() => {}}
              icon={<Icons.expand className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="px-3 pb-3">
        <p className="text-md font-semibold">{data.name}</p>
        <p className="text-sm font-semibold text-gray-500">{data.category}</p>
      </div>
    </div>
  )
}

export default ExploreCard