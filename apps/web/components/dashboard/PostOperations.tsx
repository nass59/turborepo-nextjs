"use client";

import { Alert } from "@components/Alert";
import { DropdownMenu } from "@components/DropdownMenu";
import { Icons } from "@components/icons";
import { toast } from "@components/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostOperationsProps {
  post: {
    id: number;
    title: string;
  };
}

async function deletePost(postId: string) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      message: "Your post was not deleted. Please try again.",
      type: "error",
    });
  }

  return true;
}

export const PostOperations = ({ post }: PostOperationsProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Link href={`/editor/${post.id}`} className="flex w-full">
                Edit
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
              onSelect={() => setShowDeleteAlert(true)}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
      <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>
              Are you sure you want to delete this post?
            </Alert.Title>
            <Alert.Description>This action cannot be undone.</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>
            <Alert.Action
              className="bg-red-600 focus:ring-red-600"
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deletePost(post.id.toString());

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  );
};
