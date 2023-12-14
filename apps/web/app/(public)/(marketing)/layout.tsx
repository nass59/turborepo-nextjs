import { type PropsWithChildren } from "react"

import { marketingConfig } from "@/config/marketing"
import { Footer } from "@/components/footer/footer"
import { Header } from "@/components/header"

/**
 * Define the marketing layout for the segment of the site
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header mainNavItems={marketingConfig.mainNav} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
