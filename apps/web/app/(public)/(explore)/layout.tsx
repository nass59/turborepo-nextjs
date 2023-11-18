import { ExploreHeader } from "@/components/explore/explore-header"
import { SiteFooter } from "@/components/site-footer"

interface ExploreLayoutProps {
  children: React.ReactNode
}

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ExploreHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
