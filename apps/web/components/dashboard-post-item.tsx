import Link from "next/link"

import { PostDocumentProps } from "@lib/database/post"
import { formatDate } from "@lib/utils"
import { Skeleton } from "@components/ui/skeleton"
import { PostOperations } from "./dashboard-post-operations"

export const PostItem = ({ post }: PostDocumentProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post._id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>

        <div>
          <p className="text-sm text-slate-600">
            {formatDate(post.createdAt || "")}
          </p>
        </div>
      </div>

      <PostOperations post={post} />
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