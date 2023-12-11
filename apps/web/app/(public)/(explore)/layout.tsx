import { ModalProvider } from "@/providers/modal-explore-provider"

import { ExploreHeader } from "@/components/explore/explore-header"
import { Footer } from "@/components/footer/footer"

interface ExploreLayoutProps {
  children: React.ReactNode
}

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ModalProvider />
      <ExploreHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
