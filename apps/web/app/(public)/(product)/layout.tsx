import { ProductHeader } from "@/components/product/product-header"
import { SiteFooter } from "@/components/site-footer"

interface ProductLayoutProps {
  children: React.ReactNode
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ProductHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
