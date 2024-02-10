"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons"
import axios from "axios"

import { routes } from "@/constants/routes"
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

import { apiRoutes } from "../constants/routes"

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
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete this resource?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            resource.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>
            {loading && <UpdateIcon className="mr-2 size-4 animate-spin" />}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
