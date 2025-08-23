import type { Metadata } from 'next';

import { Heading } from '@/components/heading';
import { Post } from '@/features/public/blog/ui/post';
import { ContentContainer } from '@/features/public/common/ui/content-container';

import { mdxData as Post1 } from './(posts)/nasa-artemis-program/page.mdx';
import { mdxData as Post3 } from './(posts)/our-solar-system-a-fascinating-place/page.mdx';
import { mdxData as Post4 } from './(posts)/the-great-ovni-mystery-solved/page.mdx';
import { mdxData as Post2 } from './(posts)/what-is-spacex/page.mdx';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function Page() {
  const posts = [Post1, Post2, Post3, Post4];

  return (
    <ContentContainer centered>
      <Heading
        description="A blog built using @next/mdx. Posts are written in MDX."
        title="Blog"
      />
      <div className="grid gap-10 sm:grid-cols-2">
        {posts.map((post, index) => (
          <Post hasPriority={index <= 1} key={post.slug} post={post} />
        ))}
      </div>
    </ContentContainer>
  );
}
