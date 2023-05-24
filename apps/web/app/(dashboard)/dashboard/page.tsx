import { redirect } from "next/navigation"

import { authOptions } from "@lib/auth"
import { getCurrentUser } from "@lib/sessions"
import { EmptyPlaceholder } from "@components/dashboard-empty-placeholder"
import { DashboardHeader } from "@components/dashboard-header-page"
import { PostCreateButton } from "@components/dashboard-post-create-button"
import { PostItem } from "@components/dashboard-post-item"
import { DashboardShell } from "@components/dashboard-shell"

interface Post {
  id: number
  title: string
  createdAt: string
}

const posts: Post[] = [
  // {
  //   id: 1,
  //   title: "Avatar 2, WOW!!!",
  //   createdAt: "2022-12-15",
  // },
  // {
  //   id: 2,
  //   title: "Wednesday now on Netflix",
  //   createdAt: "2022-02-08",
  // },
]

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>

      <div>
        {posts?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton className="border-slate-200 bg-white text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
