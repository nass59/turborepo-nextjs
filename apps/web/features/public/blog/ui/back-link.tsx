import { buttonVariants } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  className?: string;
};

export const BackLink = ({ className }: Props) => {
  return (
    <Link
      className={cn(buttonVariants({ variant: 'ghost' }), className)}
      href="/blog"
    >
      <ChevronLeftIcon className="mr-2 size-4" />
      See all posts
    </Link>
  );
};
