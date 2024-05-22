import { type LayoutProps } from "@/types/common"
import { PageWrapper } from "@/features/public/common/ui/page-wrapper"
import { ModalProvider } from "@/features/public/explore/providers/modal-provider"
import { getCategoryRoutes } from "@/features/public/explore/utilities/category"

export default async function Layout({ children }: LayoutProps) {
  const categories = await getCategoryRoutes()

  return (
    <PageWrapper mainNavItems={categories}>
      <ModalProvider />
      {children}
    </PageWrapper>
  )
}
