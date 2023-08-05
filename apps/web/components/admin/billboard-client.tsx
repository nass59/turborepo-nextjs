"use client"

import { useParams, useRouter } from "next/navigation"

import { type BillboardModel } from "@/lib/database/models/Billboard"
import { Button, Heading, Separator } from "@shared/ui"
import { Icons } from "@/components/icons"

interface BillboardClientProps {
  data: BillboardModel[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your space"
        />

        <Button
          onClick={() =>
            router.push(`/dashboard/${params.spaceId}/billboards/new`)
          }
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
    </>
  )
}
