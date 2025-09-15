import { PageWrapper } from '@/features/public/common/ui/page-wrapper';
import { ModalProvider } from '@/features/public/explore/providers/modal-provider';

import type { LayoutProps } from '@/types/common';

export default function Layout({ children }: LayoutProps) {
  return (
    <PageWrapper>
      <ModalProvider />
      {children}
    </PageWrapper>
  );
}
