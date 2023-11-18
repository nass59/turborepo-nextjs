"use client"

import { useEffect, useState } from "react"

import { Button } from "@shared/ui"
import { Icons } from "@/components/icons"

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button variant="default" size="xs">
        <Icons.shoppingBag className="h-4 w-4" />
        <span className="ml-2 text-sm font-medium text-white">0</span>
      </Button>
    </div>
  )
}

export default NavbarActions
