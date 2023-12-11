import { DocsHeader } from "@/components/docs/docs-header"
import { Footer } from "@/components/footer/footer"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <div className="container flex-1">{children}</div>
      <Footer className="border-t" />
    </div>
  )
}
