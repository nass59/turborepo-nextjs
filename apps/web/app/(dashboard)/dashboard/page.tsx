import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { findPostsForUser } from "@/lib/database/post"
import { getCurrentUser } from "@/lib/sessions"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/dashboard/dashboard-empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/dashboard-header-page"
import { PostCreateButton } from "@/components/dashboard/dashboard-post-create-button"
import { PostItem } from "@/components/dashboard/dashboard-post-item"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default async function Page() {
  const user = await getCurrentUser()

  if (!user || !user.email) {
    redirect(authOptions.pages?.signIn || "/login")
  }

  const posts = await findPostsForUser(user.email)

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>

      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post._id.toString()} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
