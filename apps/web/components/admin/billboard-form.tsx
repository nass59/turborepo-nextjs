"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { BILLBOARD_LABELS } from "@/constants/billboard"
import { apiRoutes, routes } from "@/constants/routes"
import { toastError } from "@/lib/api-response/api-responses"
import { type BillboardModel } from "@/lib/database/models/Billboard"
import { billboardSchema } from "@/lib/validation/billboard"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  Separator,
  toast,
} from "@shared/ui"
import ImageUpload from "@/components/admin/image-upload"
import { AlertModal } from "@/components/admin/modals/alert-modal"
import { Icons } from "@/components/icons"

interface BillboardFormProps {
  initialData: BillboardModel | null
}

type BillboardFormValues = z.infer<typeof billboardSchema>

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()

  const labels = initialData ? BILLBOARD_LABELS.edit : BILLBOARD_LABELS.create
  const formLabels = BILLBOARD_LABELS.form

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/billboards`

      if (initialData) {
        await axios.patch(`${baseUrl}/${params.billboardId}`, data)
      } else {
        await axios.post(`${baseUrl}`, data)
      }

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/billboards`)

      toast({ title: labels.toastMessage })
    } catch (error) {
      toastError(error, labels.error)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/billboards`
      await axios.delete(`${baseUrl}/${params.billboardId}`)

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/billboards`)

      toast({ title: BILLBOARD_LABELS.delete.toastMessage })
    } catch (error) {
      toastError(error, BILLBOARD_LABELS.delete.error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={labels.title} description={labels.desscription} />

        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Icons.trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name={formLabels.imageUrl.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formLabels.imageUrl.label}</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    maxFiles={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name={formLabels.label.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabels.label.label}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={formLabels.label.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {labels.action}
          </Button>
        </form>
      </Form>
    </>
  )
}
