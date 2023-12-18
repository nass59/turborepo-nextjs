import { type LayoutProps } from "@/types/common"
import { marketingConfig } from "@/config/marketing"
import { Footer } from "@/components/footer/footer"
import { Header } from "@/components/header"

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header mainNavItems={marketingConfig.mainNav} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
