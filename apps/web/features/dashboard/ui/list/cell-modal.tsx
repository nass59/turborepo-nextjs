import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { UpdateIcon } from "@radix-ui/react-icons"
import axios from "axios"

import { apiRoutes } from "@/constants/routes"
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
  toast,
} from "@shared/ui"

type Props = {
  resource: string
  resourceId: string
  open: boolean
  setOpen: (open: boolean) => void
}

export const CellModal = ({ resource, resourceId, open, setOpen }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()

  // TODO: Refactor using Server Actions
  const onDelete = async () => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/${resource}`
      await axios.delete(`${baseUrl}/${resourceId}`)
      router.refresh()
      toast({ title: "This resource has been successfully deleted" })
    } catch (error) {
      toastError(error, "An error occurred while deleting the resource")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Test</AlertDialogTitle>
          <AlertDialogDescription>Testttt</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>
            {loading && <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
