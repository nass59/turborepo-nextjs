import { type PropsWithChildren } from "react"

import { docsConfig } from "@/config/docs"
import { marketingConfig } from "@/config/marketing"
import { Breadcrumb } from "@/components/docs/docs-breadcrumb"
import { Footer } from "@/components/footer/footer"
import { Header } from "@/components/header"
import { Search } from "@/features/docs/ui/search"
import { Sidebar } from "@/features/docs/ui/sidebar"

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header
        mainNavItems={marketingConfig.mainNav}
        sidebarNavItems={docsConfig.sidebarNav}
      >
        <Search />
      </Header>

      <div className="container flex-1 md:grid md:grid-cols-[240px_1fr] md:gap-10">
        <Sidebar items={docsConfig.sidebarNav} />

        <div className="space-y-4 py-4">
          <Breadcrumb />
          {children}
        </div>
      </div>

      <Footer />
    </>
  )
}
