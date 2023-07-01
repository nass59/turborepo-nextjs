import Link from "next/link"
import { buttonVariants, cn } from "ui"

import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

export const MarketingHeader = () => {
  return (
    <header className="container z-40 bg-background">
      <div className="flex h-20 items-center justify-between border-b py-6">
        <MainNav items={marketingConfig.mainNav} />
        <nav className="flex gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "brand", size: "sm" }))}
          >
            Login
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Github
          </Link>
        </nav>
      </div>
    </header>
  )
}
