"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { routes } from "@/constants/routes"
import { toastError } from "@/lib/api-response/api-responses"
import { type ItemModel } from "@/lib/database/models/Item"
import { Separator, toast } from "@shared/ui"
import { apiRoutes } from "@/features/admin/common/constants/routes"
import { CheckboxField } from "@/features/admin/common/ui/form/checkbox-field"
import { FormContainer } from "@/features/admin/common/ui/form/form-container"
import { InputField } from "@/features/admin/common/ui/form/input-field"
import { MultiImagesField } from "@/features/admin/common/ui/form/multi-images-field"
import { SelectField } from "@/features/admin/common/ui/form/select-field"

import { type CategoryColumn } from "../../category/ui/columns"
import { ITEM_LABELS } from "../constants/item"
import { defaultData, itemSchema, type ItemFormData } from "../schemas/item"

type Props = {
  initialData: ItemModel | null
  categories: CategoryColumn[]
}

export const ItemForm = ({ initialData, categories }: Props) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: initialData || defaultData,
  })

  const { form: formLabels, resource } = ITEM_LABELS
  const { spaceId, itemId } = params

  // TODO: Refactor using Server Actions
  const onSubmit = async (data: ItemFormData) => {
    try {
      setLoading(true)
      const path = `${spaceId}/${resource}`
      const apiBaseUrl = `${apiRoutes.spaces}/${path}`
      const resourceUrl = `${routes.dashboard}/${path}`

      if (initialData) {
        await axios.patch(`${apiBaseUrl}/${itemId}`, data)
      } else {
        await axios.post(apiBaseUrl, data)
      }

      router.refresh()
      router.push(resourceUrl)
      toast({ title: `Resource ${initialData ? "updated" : "created"}.` })
    } catch (error) {
      toastError(error, "An error occurred while creating the resource.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormContainer
      form={form}
      initialData={initialData}
      onSubmit={onSubmit}
      loading={loading}
    >
      {/* Images */}
      <MultiImagesField
        labels={formLabels.images}
        control={form.control}
        loading={loading}
      />

      {/* Name */}
      <InputField
        labels={formLabels.name}
        control={form.control}
        loading={loading}
      />

      {/* Category */}
      <SelectField
        labels={formLabels.categoryId}
        control={form.control}
        loading={loading}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />

      <Separator className="col-span-3 w-[675px]" />

      <div className="col-span-3 flex gap-5">
        <CheckboxField labels={formLabels.isFeatured} control={form.control} />
        <CheckboxField labels={formLabels.isArchived} control={form.control} />
      </div>
    </FormContainer>
  )
}
