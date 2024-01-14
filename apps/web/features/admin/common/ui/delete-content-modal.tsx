"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { UpdateIcon } from "@radix-ui/react-icons"
import axios from "axios"

import { apiRoutes, routes } from "@/constants/routes"
import { toastError } from "@/lib/api-response/api-responses"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  toast,
} from "@shared/ui"
import { Icons } from "@/components/icons"

type Props = {
  resource: string
}

export const DeleteContentModal = ({ resource }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()

  // TODO: Refactor using Server Actions
  const onDelete = async () => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/${resource}`
      await axios.delete(`${baseUrl}/${params.categoryId}`)

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/${resource}`)

      toast({ title: "Resource deleted." })
    } catch (error) {
      toastError(
        error,
        "Sorry an error occurred.Your resource was not deleted."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Icons.trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete this resource?
          </AlertDialogTitle>
          <AlertDialogDescription>
            "This action cannot be undone. This will permanently delete your
            resource.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>
            {loading && <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
