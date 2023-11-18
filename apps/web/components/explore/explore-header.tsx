import Link from "next/link"

import { env } from "@/env.mjs"
import { findAllCategoriesBySpaceId } from "@/lib/database/category"
import { parseData } from "@/lib/utils"
import { buttonVariants, cn } from "@shared/ui"
import { ExploreNav } from "@/components/explore/explore-nav"

export const ExploreHeader: React.FC = async () => {
  const categories = await findAllCategoriesBySpaceId(env.SPACE_ID)

  return (
    <header className="container z-40 bg-background">
      <div className="flex h-20 items-center justify-between gap-x-4 border-b py-6">
        <ExploreNav data={parseData(categories)} />
        <nav className="flex gap-2">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "brand", size: "sm" }))}
          >
            Go to Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}
