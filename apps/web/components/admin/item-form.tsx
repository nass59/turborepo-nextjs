"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ITEM_LABELS } from "@/constants/item"
import { apiRoutes, routes } from "@/constants/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { toastError } from "@/lib/api-response/api-responses"
import { type CategoryModel } from "@/lib/database/models/Category"
import { type ItemModel } from "@/lib/database/models/Item"
import { itemSchema } from "@/lib/validation/item"
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  toast,
} from "@shared/ui"
import ImageUpload from "@/components/admin/image-upload"
import { AlertModal } from "@/components/admin/modals/alert-modal"
import { Icons } from "@/components/icons"

interface ItemFormProps {
  initialData: ItemModel | null
  categories: CategoryModel[]
}

type ItemFormValues = z.infer<typeof itemSchema>

export const ItemForm: React.FC<ItemFormProps> = ({
  initialData,
  categories,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()
  const router = useRouter()

  const labels = initialData ? ITEM_LABELS.edit : ITEM_LABELS.create
  const formLabels = ITEM_LABELS.form

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: initialData || {
      name: "",
      images: [],
      categoryId: "",
      isFeatured: false,
      isArchived: false,
    },
  })

  const onSubmit = async (data: ItemFormValues) => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/items`

      if (initialData) {
        await axios.patch(`${baseUrl}/${params.itemId}`, data)
      } else {
        await axios.post(`${baseUrl}`, data)
      }

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/items`)

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
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/items`
      await axios.delete(`${baseUrl}/${params.itemId}`)

      router.refresh()
      router.push(`${routes.dashboard}/${params.spaceId}/items`)

      toast({ title: ITEM_LABELS.delete.toastMessage })
    } catch (error) {
      toastError(error, ITEM_LABELS.delete.error)
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
            name={formLabels.images.name}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{formLabels.images.label}</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image)}
                      disabled={loading}
                      onChange={(url) => {
                        field.onChange([...field.value, url])
                      }}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter((current) => current !== url),
                        ])
                      }
                      maxFiles={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

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
              name={formLabels.categoryId.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabels.categoryId.label}</FormLabel>
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
                          placeholder={formLabels.categoryId.placeholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category._id.toString()}
                          value={category._id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="w-[675px]" />

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name={formLabels.isFeatured.name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{formLabels.isFeatured.label}</FormLabel>
                    <FormDescription>
                      {formLabels.isFeatured.description}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={formLabels.isArchived.name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{formLabels.isArchived.label}</FormLabel>
                    <FormDescription>
                      {formLabels.isArchived.description}
                    </FormDescription>
                  </div>
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
