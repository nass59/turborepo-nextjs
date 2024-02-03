import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { Sheet, SheetContent, SheetTrigger } from "@shared/ui"

import { Sidebar } from "./sidebar"

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <HamburgerMenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-background p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
