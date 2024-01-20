"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { toastError } from "@/lib/api-response/api-responses"
import { type SpaceModel } from "@/lib/database/models/Space"
import { settingSchema } from "@/lib/validation/setting"
import { toast } from "@shared/ui"
import { apiRoutes } from "@/features/admin/common/constants/routes"
import { FormContainer } from "@/features/admin/common/ui/form/form-container"
import { InputField } from "@/features/admin/common/ui/form/input-field"
import { SPACE_LABELS } from "@/features/admin/space/constants/space"

import { type SettingsFormData } from "../schemas/setting"

type Props = {
  initialData: SpaceModel
}

export const SettingsForm = ({ initialData }: Props) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingSchema),
    defaultValues: initialData,
  })

  // TODO: Refactor using Server Actions
  const onSubmit = async (data: SettingsFormData) => {
    try {
      setLoading(true)
      await axios.patch(`${apiRoutes.spaces}/${params.spaceId}`, data)
      router.refresh()
      toast({ title: SPACE_LABELS.edit.toastMessage })
    } catch (error) {
      toastError(error, SPACE_LABELS.edit.error)
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
      <InputField
        labels={SPACE_LABELS.form.name}
        control={form.control}
        loading={loading}
      />
    </FormContainer>
  )
}
