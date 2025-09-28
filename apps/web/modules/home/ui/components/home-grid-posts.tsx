import { MagicCard } from '@workspace/design-system/components/magicui/magic-card';
import Image from 'next/image';

export const HomeGridPosts = () => {
  const posts = [
    {
      id: 1,
      title: 'AI Generated Art in 2025',
      description: 'How AI is transforming the art world.',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Typescript Tips and Tricks',
      description:
        'Understanding advanced Typescript features for better coding.',
      imageUrl:
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-1 xl:grid-cols-2">
      {posts.map((post) => (
        <MagicCard className="rounded-none p-1" key={post.id}>
          <Image
            alt={post.title}
            className="h-70 w-full object-cover"
            height={400}
            src={post.imageUrl}
            width={500}
          />

          <div className="flex flex-col gap-1 p-2">
            <h3 className="font-bold text-gray-100 text-md tracking-tighter">
              {post.title}
            </h3>
            <p className="text-gray-300 text-sm tracking-tight">
              {post.description}
            </p>
          </div>
        </MagicCard>
      ))}
    </div>
  );
};
