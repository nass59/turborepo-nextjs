import Link from "next/link"

import { formatDate } from "@lib/utils"
import { Skeleton } from "@components/dashboard-skeleton"
import { PostOperations } from "./dashboard-post-operations"

interface PostItemProps {
  post: {
    id: number
    title: string
    createdAt: string
  }
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>

        <div>
          <p className="text-sm text-slate-600">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <PostOperations post={{ id: post.id, title: post.title }} />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
