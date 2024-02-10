"use client"

import { useParams, useRouter } from "next/navigation"
import { PlusIcon } from "@radix-ui/react-icons"

import { routes } from "@/constants/routes"
import { Button } from "@shared/ui"

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
      <PlusIcon className="mr-2 size-4" />
      {labels.add}
    </Button>
  )
}
