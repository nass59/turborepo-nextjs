import { PostCreateButton } from "@components/dashboard/PostCreateButton";
import { DashboardShell } from "@components/dashboard/shell";
import { DashboardHeader } from "@components/dashboard/header";
import { PostItem } from "@components/dashboard/PostItem";

export default function loading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
