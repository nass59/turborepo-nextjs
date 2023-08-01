"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { type BillboardModel } from "@/lib/database/models/Billboard"
// import { useOrigin } from "@/hooks/use-origin"
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
// import { ApiAlert } from "@/components/admin/api-alert"
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

const CONFIG_LABELS = {
  create: {
    title: "Create billboard",
    desscription: "Add a new billboard",
    toastMessage: "Billboard created.",
    action: "Create",
  },
  edit: {
    title: "Edit billboard",
    desscription: "Edit a billboard",
    toastMessage: "Billboard updated.",
    action: "Save changes",
  },
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()
  // const origin = useOrigin()

  const labels = initialData ? CONFIG_LABELS.edit : CONFIG_LABELS.create

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

      await axios.patch(`/api/spaces/${params.spaceId}`, data)
      router.refresh()

      toast({
        title: "Space updated.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: "Your space was not updated. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)

      await axios.delete(`/api/spaces/${params.spaceId}`)
      router.refresh()
      router.push("/dashboard")

      toast({
        title: "Space deleted.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: "Make sure you removed all categories first.",
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
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
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

      <Separator />
    </>
  )
}
