import { MarketingHeader } from "@/components/marketing/marketing-header"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
