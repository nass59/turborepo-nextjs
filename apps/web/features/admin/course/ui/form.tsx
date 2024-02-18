"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { routes } from "@/constants/routes"
import { toastError } from "@/lib/api-response/api-responses"
import { toast } from "@shared/ui"
import { apiRoutes } from "@/features/admin/common/constants/routes"
import { FormContainer } from "@/features/admin/common/ui/form/form-container"
import { ImageField } from "@/features/admin/common/ui/form/image-field"
import { InputField } from "@/features/admin/common/ui/form/input-field"

import { COURSE_LABELS } from "../constants/course"
import { type CourseModel } from "../repository/model"
import {
  courseSchema,
  defaultData,
  type CourseFormData,
} from "../schemas/course"

type Props = {
  initialData: CourseModel | null
}

export const CourseForm = ({ initialData }: Props) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || defaultData,
  })

  const { form: formLabels, resource } = COURSE_LABELS
  const { spaceId, billboardId } = params

  // TODO: Refactor using Server Actions
  const onSubmit = async (data: CourseFormData) => {
    try {
      setLoading(true)
      const path = `${spaceId}/${resource}`
      const apiBaseUrl = `${apiRoutes.spaces}/${path}`
      const resourceUrl = `${routes.dashboard}/${path}`

      if (initialData) {
        await axios.patch(`${apiBaseUrl}/${billboardId}`, data)
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
      <ImageField
        labels={formLabels.imageUrl}
        control={form.control}
        loading={loading}
      />

      {/* Name */}
      <InputField
        labels={formLabels.title}
        control={form.control}
        loading={loading}
      />
    </FormContainer>
  )
}
