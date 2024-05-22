import { type LayoutProps } from "@/types/common"

import "@/assets/styles/mdx.css"

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="relative lg:gap-10 xl:grid">
      <div className="mx-auto w-full min-w-0 space-y-6">{children}</div>
    </main>
  )
}
