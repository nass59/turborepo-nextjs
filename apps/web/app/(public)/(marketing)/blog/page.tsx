import { Heading } from "@shared/ui"
import { Posts } from "@/features/public/blog/ui/posts"
import { ContentContainer } from "@/features/public/common/ui/content-container"

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
