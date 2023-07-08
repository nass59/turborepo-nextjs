import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { findPostForUser } from "@/lib/database/post"
import { getCurrentUser } from "@/lib/sessions"
import { Editor } from "@/components/dashboard/dashboard-editor"

interface PageProps {
  params: { postId: string }
}

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser()

  if (!user || !user.email) {
    redirect(authOptions.pages?.signIn || "/login")
  }

  const post = await findPostForUser(params.postId, user.email)

  if (!post) {
    notFound()
  }

  return <Editor post={post} />
}
