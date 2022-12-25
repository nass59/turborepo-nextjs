import { redirect } from "next/navigation";
import { getCurrentUser } from "@lib/sessions";
import { authOptions } from "@lib/auth";
import { Editor } from "@components/dashboard/Editor";

interface PageProps {
  params: { postId: string };
}

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const post = {
    id: 1,
    title: "My new post",
    content: {},
  };

  return <Editor post={post} />;
}
