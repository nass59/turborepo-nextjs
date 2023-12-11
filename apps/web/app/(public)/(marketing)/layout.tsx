import { type PropsWithChildren } from "react"

import { Footer } from "@/components/footer/footer"
import { Header } from "@/features/landing-page/ui/header"

/**
 * Define the marketing layout for the segment of the site
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
