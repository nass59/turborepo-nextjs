import { type LayoutProps } from "@/types/common"
import { Footer } from "@/components/footer/footer"
import { Header } from "@/components/header"
import { ModalProvider } from "@/features/explore/providers/modal-provider"
import { getCategoryRoutes } from "@/features/explore/utilities/category"

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
