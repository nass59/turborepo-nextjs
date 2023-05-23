"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@hooks/use-toast"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@lib/utils"
import { userAuthSchema } from "@lib/validation/userAuthSchema"
import { Icons } from "@components/icons"
import { buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGithubLoading}
              {...register("email")}
            />

            {errors?.email && (
              <p className="px-1 pb-2 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            className={cn(buttonVariants({ variant: "black" }))}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>

      <div className="relative">
        <hr className="my-2" />
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        disabled={isLoading || isGithubLoading}
        onClick={() => {
          setIsGithubLoading(true)
          signIn("github")
        }}
      >
        {isGithubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  )
}
