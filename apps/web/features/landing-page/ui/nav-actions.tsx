import Link from "next/link"

import { buttonVariants, cn } from "@shared/ui"

export const NavActions = () => {
  return (
    <nav className="flex gap-2">
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "brand", size: "md" }))}
      >
        Go to Dashboard
      </Link>
    </nav>
  )
}
