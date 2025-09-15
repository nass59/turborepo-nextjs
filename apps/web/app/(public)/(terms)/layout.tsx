import { ContentContainer } from '@/features/public/common/ui/content-container';
import { PageWrapper } from '@/features/public/common/ui/page-wrapper';
import type { LayoutProps } from '@/types/common';

export default function Layout({ children }: LayoutProps) {
  return (
    <PageWrapper>
      <ContentContainer centered>{children}</ContentContainer>
    </PageWrapper>
  );
}
