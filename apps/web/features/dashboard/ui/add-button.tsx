"use client"

import { useParams, useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import { Button } from "@shared/ui"
import { Icons } from "@/components/icons"

type Props = {
  labels: {
    add: string
  }
  path: string
}

export const AddButton = ({ labels, path }: Props) => {
  const router = useRouter()
  const params = useParams()

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}${path}`)
  }

  return (
    <Button onClick={() => onClick()}>
      <Icons.add className="mr-2 h-4 w-4" />
      {labels.add}
    </Button>
  )
}
