import { type PropsWithChildren } from "react"
import { type MainNavItem } from "@/types"

import { Footer } from "./footer/footer"
import { Header } from "./header/header"

type Props = PropsWithChildren & {
  mainNavItems: MainNavItem[]
}

export const PageWrapper = ({ mainNavItems, children }: Props) => {
  return (
    <>
      <Header mainNavItems={mainNavItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
