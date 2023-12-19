"use client"

import { type MouseEventHandler } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { type ItemModel } from "@/lib/database/models/Item"
import {
  Card,
  CardBackground,
  CardContent,
  CardFooter,
  CardTitle,
} from "@shared/ui"
import IconButton from "@/components/explore/icon-button"
import { Icons } from "@/components/icons"
import { usePreviewModal } from "@/features/explore/hooks/use-preview-modal"

type Props = {
  data: ItemModel
}

export const ExploreCard = ({ data }: Props) => {
  const previewModal = usePreviewModal()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/explore/${data._id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  return (
    <Card>
      <CardContent className="aspect-poster">
        <Image
          src={data?.images?.[0] || ""}
          alt="Image"
          fill
          className="aspect-poster object-cover"
        />
      </CardContent>
      {/* <CardFooter>
        <CardTitle>Card Title</CardTitle>
      </CardFooter> */}
    </Card>
  )

  // return (
  //   <div
  //     onClick={handleClick}
  //     className="group cursor-pointer space-y-3 rounded-xl border bg-white"
  //   >
  //     {/* Image */}
  //     <div className="relative aspect-square rounded-xl bg-gray-100">
  //       <Image
  //         src={data?.images?.[0] || ""}
  //         alt="Image"
  //         fill
  //         className="aspect-square rounded-b-none rounded-t-md object-cover"
  //       />
  //       <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
  //         <div className="flex justify-center gap-x-6">
  //           <IconButton
  //             onClick={onPreview}
  //             icon={<Icons.expand className="h-4 w-4" />}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //     {/* Description */}
  //     <div className="px-3 pb-3">
  //       <p className="text-md font-semibold">{data.name}</p>
  //       <p className="text-sm font-semibold text-gray-500">{data.category}</p>
  //     </div>
  //   </div>
  // )
}
