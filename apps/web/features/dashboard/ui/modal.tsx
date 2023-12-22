"use client"

import { useState } from "react"
import { apiRoutes, routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { toastError } from "@/lib/api-response/api-responses"
import { spaceSchema } from "@/lib/validation/space"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Modal,
} from "@shared/ui"

import { useSpaceModal } from "../hooks/use-space-modal"

export const SpaceModal = () => {
  const spaceModal = useSpaceModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const labels = SPACE_LABELS.create
  const formLabels = SPACE_LABELS.form

  const form = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof spaceSchema>) => {
    try {
      setIsLoading(true)
      const response = await axios.post(apiRoutes.spaces, values)
      window.location.assign(
        `${routes.dashboard}/${response.data._id.toString()}`
      )
    } catch (error) {
      toastError(error, labels.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title={labels.title}
      description={labels.desscription}
      isOpen={spaceModal.isOpen}
      onClose={spaceModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name={formLabels.name.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={formLabels.name.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={spaceModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading && (
                    <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span>Continue</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
