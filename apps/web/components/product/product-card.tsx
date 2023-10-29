"use client"

import Image from "next/image"

import { type Item } from "@/config/product"
import { Icons } from "@/components/icons"
import IconButton from "@/components/product/icon-button"

interface ProductCardProps {
  data: Item
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
    <div className="group cursor-pointer space-y-3 rounded-xl border bg-white">
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

export default ProductCard
