import { DocsSidebarNav } from "@components/DocsSidebarNav"
import { docsConfig } from "@config/docs"
import { Breadcrumb } from "@ui/Breadcrumb"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-r-slate-100 py-6 pr-2 md:sticky md:block lg:py-10">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>
      <div>
        <div className="py-4">
          <Breadcrumb />
        </div>
        {children}
      </div>
    </div>
  )
}
