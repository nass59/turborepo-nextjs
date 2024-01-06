"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { apiRoutes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
import { toastError } from "@/lib/api-response/api-responses"
import { type SpaceModel } from "@/lib/database/models/Space"
import { settingSchema } from "@/lib/validation/setting"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@shared/ui"

import { type SettingsFormData } from "../../schemas/setting"

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name={SPACE_LABELS.form.name.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={SPACE_LABELS.form.name.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormFooter>
          <Button disabled={loading} type="submit">
            {SPACE_LABELS.edit.action}
          </Button>
        </FormFooter>
      </form>
    </Form>
  )
}
