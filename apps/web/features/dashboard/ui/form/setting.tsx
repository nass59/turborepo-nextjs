"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { apiRoutes, routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
import { toastError } from "@/lib/api-response/api-responses"
import { type SpaceModel } from "@/lib/database/models/Space"
import { settingSchema } from "@/lib/validation/setting"
import { useOrigin } from "@/hooks/use-origin"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  toast,
} from "@shared/ui"
import { ApiAlert } from "@/components/admin/api-alert"
import { Icons } from "@/components/icons"

import { type SettingsFormData } from "../../schemas/setting"
import { AlertModal } from "../alert-modal"

type Props = {
  initialData: SpaceModel
}

export const SettingsForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingSchema),
    defaultValues: initialData,
  })

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

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

  // TODO: Refactor using Server Actions
  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`${apiRoutes.spaces}/${params.spaceId}`)
      router.refresh()
      router.push(routes.dashboard)
      toast({ title: SPACE_LABELS.delete.toastMessage })
    } catch (error) {
      toastError(error, SPACE_LABELS.delete.error)
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

      <Button
        className="absolute right-8 top-8"
        variant="destructive"
        size="icon"
        disabled={loading}
        onClick={() => setOpen(true)}
      >
        <Icons.trash className="h-4 w-4" />
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
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

          <Button disabled={loading} className="ml-auto" type="submit">
            {SPACE_LABELS.edit.action}
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}${apiRoutes.spaces}/${params.spaceId}`}
        variant="public"
      />
    </>
  )
}
