"use client"

import { useParams, useRouter } from "next/navigation"

import { Button, Heading, Separator } from "@shared/ui"
import { Icons } from "@/components/icons"

export const BillboardClient: React.FC = () => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
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
