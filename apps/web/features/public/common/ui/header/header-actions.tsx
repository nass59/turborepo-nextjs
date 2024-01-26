import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants, cn } from "@shared/ui"
import { Icons } from "@/components/icons"

export const HeaderActions = () => {
  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-2">
        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "brand" }))}
        >
          Go to Dashboard
        </Link>

        {/* Github */}
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
        >
          <Button variant="default" size="icon" tabIndex={-1}>
            <Icons.github className="size-4 fill-white" />
            <span className="sr-only">Github</span>
          </Button>
        </Link>
      </nav>
    </div>
  )
}
