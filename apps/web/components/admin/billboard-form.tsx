"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { BILLBOARD_LABELS } from "@/constants/billboard"
import { apiRoutes, routes } from "@/constants/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { type BillboardModel } from "@/lib/database/models/Billboard"
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

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: BillboardModel | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()

  const labels = initialData ? BILLBOARD_LABELS.edit : BILLBOARD_LABELS.create

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(
          `${apiRoutes.spaces}/${params.spaceId}/billboards/${params.billboardId}`,
          data
        )
      } else {
        await axios.post(
          `${apiRoutes.spaces}/${params.spaceId}/billboards`,
          data
        )
      }

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/billboards`)

      toast({ title: initialData ? labels.toastMessage : labels.toastMessage })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: initialData ? labels.error : labels.error,
      })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)

      await axios.delete(
        `${apiRoutes.spaces}/${params.spaceId}/billboards/${params.billboardId}`
      )

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/billboards`)

      toast({ title: BILLBOARD_LABELS.delete.toastMessage })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: BILLBOARD_LABELS.delete.error,
      })
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
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
