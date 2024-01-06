"use client"

import React from "react"

import { Button, toast } from "@shared/ui"
import { Icons } from "@/components/icons"

type Props = {
  description: string
  message: string
}

export const CopyButton = ({ description, message }: Props) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast({ title: message })
  }

  return (
    <Button variant="outline" size="icon" onClick={onCopy}>
      <Icons.copy className="h-4 w-4" />
    </Button>
  )
}
