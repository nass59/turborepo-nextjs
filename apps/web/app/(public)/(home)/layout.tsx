import { Header } from '@/app/modules/home/ui/home-header';
import type { LayoutProps } from '@/types/common';

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
