"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { routes } from "@/constants/routes"
import { toastError } from "@/lib/api-response/api-responses"
import { type CategoryModel } from "@/lib/database/models/Category"
import { toast } from "@shared/ui"
import { type BillboardColumn } from "@/features/admin/billboard/ui/columns"
import { apiRoutes } from "@/features/admin/common/constants/routes"
import { FormContainer } from "@/features/admin/common/ui/form/form-container"
import { InputField } from "@/features/admin/common/ui/form/input-field"
import { SelectField } from "@/features/admin/common/ui/form/select-field"

import { CATEGORY_LABELS } from "../constants/category"
import {
  categorySchema,
  defaultData,
  type CategoryFormData,
} from "../schemas/category"

type Props = {
  initialData: CategoryModel | null
  billboards: BillboardColumn[]
}

export const CategoryForm = ({ initialData, billboards }: Props) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || defaultData,
  })

  const { form: formLabels, resource } = CATEGORY_LABELS
  const { spaceId, categoryId } = params

  // TODO: Refactor using Server Actions
  const onSubmit = async (data: CategoryFormData) => {
    try {
      setLoading(true)
      const path = `${spaceId}/${resource}`
      const apiBaseUrl = `${apiRoutes.spaces}/${path}`
      const resourceUrl = `${routes.dashboard}/${path}`

      if (initialData) {
        await axios.patch(`${apiBaseUrl}/${categoryId}`, data)
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
      {/* Name */}
      <InputField
        labels={formLabels.name}
        control={form.control}
        loading={loading}
      />

      {/* Billboard */}
      <SelectField
        labels={formLabels.billboardId}
        control={form.control}
        loading={loading}
        options={billboards.map((billboard) => ({
          label: billboard.label,
          value: billboard.id,
        }))}
      />
    </FormContainer>
  )
}
