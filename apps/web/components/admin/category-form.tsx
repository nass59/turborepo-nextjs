"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { CATEGORY_LABELS } from "@/constants/category"
import { apiRoutes, routes } from "@/constants/routes"
import { toastError } from "@/lib/api-response/api-responses"
import { type BillboardModel } from "@/lib/database/models/Billboard"
import { type CategoryModel } from "@/lib/database/models/Category"
import { categorySchema } from "@/lib/validation/category"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  HeadingDescription,
  HeadingTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  toast,
} from "@shared/ui"
import { AlertModal } from "@/components/admin/modals/alert-modal"
import { Icons } from "@/components/icons"

interface CategoryFormProps {
  initialData: CategoryModel | null
  billboards: BillboardModel[]
}

type CategoryFormValues = z.infer<typeof categorySchema>

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()

  const labels = initialData ? CATEGORY_LABELS.edit : CATEGORY_LABELS.create
  const formLabels = CATEGORY_LABELS.form

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  })

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/categories`

      if (initialData) {
        await axios.patch(`${baseUrl}/${params.categoryId}`, data)
      } else {
        await axios.post(`${baseUrl}`, data)
      }

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/categories`)

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
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/categories`
      await axios.delete(`${baseUrl}/${params.categoryId}`)

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/categories`)

      toast({ title: CATEGORY_LABELS.delete.toastMessage })
    } catch (error) {
      toastError(error, CATEGORY_LABELS.delete.error)
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
        <Heading>
          <HeadingTitle>{labels.title}</HeadingTitle>
          <HeadingDescription>{labels.desscription}</HeadingDescription>
        </Heading>

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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name={formLabels.name.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabels.name.label}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={formLabels.name.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={formLabels.billboardId.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabels.billboardId.label}</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={formLabels.billboardId.placeholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem
                          key={billboard._id.toString()}
                          value={billboard._id.toString()}
                        >
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
