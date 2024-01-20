import { type LayoutProps } from "@/types/common"
import { Footer } from "@/features/public/common/ui/footer/footer"
import { Header } from "@/features/public/common/ui/header/header"
import { ModalProvider } from "@/features/public/explore/providers/modal-provider"
import { getCategoryRoutes } from "@/features/public/explore/utilities/category"

export default async function Layout({ children }: LayoutProps) {
  const categories = await getCategoryRoutes()

  return (
    <>
      <ModalProvider />
      <Header mainNavItems={categories} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
