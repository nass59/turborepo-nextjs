import { Heading } from "@shared/ui"
import { ContentContainer } from "@/components/content-container"
import { Posts } from "@/features/blog/ui/posts"

export const metadata = {
  title: "Blog",
}

export default function Page() {
  return (
    <ContentContainer centered>
      <Heading
        title="Blog"
        description="A blog built using ContentLayer. Posts are written in MDX."
      />
      <Posts />
    </ContentContainer>
  )
}
