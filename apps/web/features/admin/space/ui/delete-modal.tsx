"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { UpdateIcon } from "@radix-ui/react-icons"
import axios from "axios"

import { apiRoutes, routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
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

export const DeleteModal = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()

  // TODO: Refactor using Server Actions
  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`${apiRoutes.spaces}/${params.spaceId}`)
      router.refresh()
      router.push(routes.dashboard)
      toast({ title: SPACE_LABELS.delete.toastMessage })
    } catch (error) {
      toastError(error, SPACE_LABELS.delete.error)
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
          <AlertDialogTitle>{SPACE_LABELS.delete.modalTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {SPACE_LABELS.delete.modalDescription}
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
