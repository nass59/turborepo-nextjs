"use client"

import React from "react"
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@shared/ui"

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
      <CopyIcon className="size-4" />
    </Button>
  )
}
