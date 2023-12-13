import { Heading } from "@/features/blog/ui/heading"
import { Posts } from "@/features/blog/ui/posts"

export const metadata = {
  title: "Blog",
}

export default function Page() {
  return (
    <>
      <Heading
        title="Blog"
        description="A blog built using ContentLayer. Posts are written in MDX."
      />
      <Posts />
    </>
  )
}
