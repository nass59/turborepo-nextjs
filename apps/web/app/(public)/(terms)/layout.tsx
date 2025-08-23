import { marketingConfig } from '@/config/marketing';
import { ContentContainer } from '@/features/public/common/ui/content-container';
import { PageWrapper } from '@/features/public/common/ui/page-wrapper';
import type { LayoutProps } from '@/types/common';

export default function Layout({ children }: LayoutProps) {
  return (
    <PageWrapper mainNavItems={marketingConfig.mainNav}>
      <ContentContainer centered>{children}</ContentContainer>
    </PageWrapper>
  );
}
