import { Skeleton } from '@workspace/design-system/components/ui/skeleton';
import { type ReactNode, Suspense } from 'react';

/**
 * Loading fallback component for the home page
 */
const HomePageSkeleton = () => (
  <div className="flex min-h-screen flex-col bg-[#030303]">
    <div className="items-start md:grid md:grid-cols-2">
      {/* Left side skeleton */}
      <div className="overflow-hidden p-8">
        <div className="mx-auto flex h-full max-w-2xl flex-col gap-4 md:justify-center">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-full" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="mt-6 flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      {/* Right side skeleton */}
      <div className="hidden md:block">
        <Skeleton className="h-screen w-full" />
      </div>
    </div>
  </div>
);

type Props = {
  children: ReactNode;
};

/**
 * Suspense wrapper for home page content with loading skeleton
 */
export const HomeSuspenseWrapper = ({ children }: Props) => (
  <Suspense fallback={<HomePageSkeleton />}>{children}</Suspense>
);
