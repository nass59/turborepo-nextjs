"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useSpaceModal } from "@/hooks/use-space-modal"
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
  toast,
} from "@shared/ui"

const formSchema = z.object({
  name: z.string().min(1),
})

export const SpaceModal: React.FC = () => {
  const spaceModal = useSpaceModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const response = await axios.post("/api/spaces", values)
      window.location.assign(`/dashboard/${response.data._id.toString()}`)
    } catch (error) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: "Your space was not saved. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Create Space"
      description="Add a new space to manage product and categories"
      isOpen={spaceModal.isOpen}
      onClose={spaceModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Gaming"
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
