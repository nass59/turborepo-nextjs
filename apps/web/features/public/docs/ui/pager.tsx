import { buttonVariants } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { getPagerForDoc } from '../utilities/pager';

type Props = {
  url: string;
};

export const Pager = ({ url }: Props) => {
  const pager = getPagerForDoc(url);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {/* Prev */}
      {pager?.prev && (
        <Link
          className={buttonVariants({ variant: 'ghost' })}
          href={pager.prev.href}
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          {pager.prev.title}
        </Link>
      )}

      {/* Next */}
      {pager?.next && (
        <Link
          className={cn(buttonVariants({ variant: 'ghost' }), 'ml-auto')}
          href={pager.next.href}
        >
          {pager.next.title}
          <ArrowRightIcon className="ml-2 size-4" />
        </Link>
      )}
    </div>
  );
};
