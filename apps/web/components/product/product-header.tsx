import Link from "next/link"

import { env } from "@/env.mjs"
import { findAllCategoriesBySpaceId } from "@/lib/database/category"
import { parseData } from "@/lib/utils"
import { buttonVariants, cn } from "@shared/ui"
import { ProductNav } from "@/components/product/product-nav"
import NavbarActions from "@/components/product/product-navbar-actions"

export const ProductHeader: React.FC = async () => {
  const categories = await findAllCategoriesBySpaceId(env.SPACE_ID)

  return (
    <header className="container z-40 bg-background">
      <div className="flex h-20 items-center justify-between gap-x-4 border-b py-6">
        <ProductNav data={parseData(categories)} />
        <NavbarActions />
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
