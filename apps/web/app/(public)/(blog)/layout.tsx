import { marketingConfig } from "@/config/marketing";
import { PageWrapper } from "@/features/public/common/ui/page-wrapper";
import { type LayoutProps } from "@/types/common";

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <PageWrapper mainNavItems={marketingConfig.mainNav}>{children}</PageWrapper>
  );
}
