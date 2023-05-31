"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@hooks/use-toast"
import { User } from "interfaces"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@lib/utils"
import { userNameSchema } from "@lib/validation/user"
import { Card } from "@components/ui/card"
import { Label } from "@components/ui/label"
import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"
import { Input } from "./ui/input"

interface UserNameProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">
}

type FormData = z.infer<typeof userNameSchema>

export function UserNameForm({ user, className, ...props }: UserNameProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: { name: user?.name || "" },
  })

  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    })

    setIsSaving(false)

    if (!response.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your name has been updated",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <Card.Header>
          <Card.Title>Your Name</Card.Title>
          <Card.Description>
            Please enter your full name or display name you are comfortable
            with.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>

            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />

            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </Card.Content>

        <Card.Footer>
          <button
            type="submit"
            className={cn(buttonVariants({ variant: "black" }))}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </Card.Footer>
      </Card>
    </form>
  )
}
