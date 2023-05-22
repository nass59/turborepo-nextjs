"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@hooks/use-toast"

import { cn } from "@lib/utils"
import { Icons } from "@components/icons"

interface PostCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const PostCreateButton = ({
  className,
  ...props
}: PostCreateButtonProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
      })
    }

    const post = await response.json()
    console.log("🚀 ~ file: PostCreateButton.tsx:41 ~ onClick ~ post", post)

    // force cache invalidation
    router.refresh()
    router.push(`/editor/new-post`)
  }

  return (
    <button
      className={cn(
        "relative mt-1 inline-flex h-9 items-center rounded-md border border-transparent bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
        className
      )}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  )
}
