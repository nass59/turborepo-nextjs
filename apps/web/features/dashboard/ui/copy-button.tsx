"use client"

import React from "react"

import { Button } from "@shared/ui"
import { Icons } from "@/components/icons"

import { onCopy } from "../utilities/copy"

type Props = {
  description: string
  message: string
}

export const CopyButton = ({ description, message }: Props) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => onCopy(description, message)}
    >
      <Icons.copy className="h-4 w-4" />
    </Button>
  )
}
