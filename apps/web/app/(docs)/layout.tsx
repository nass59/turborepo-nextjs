import { DocsHeader } from "@components/DocsHeader"
import { SiteFooter } from "@components/site-footer"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <div className="container flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
