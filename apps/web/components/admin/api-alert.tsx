"use client"

import React from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@shared/ui/components/ui/alert"

import { Badge, Button, toast, type BadgeProps } from "@shared/ui"
import { Icons } from "@/components/icons"

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast({
      title: "API route copied to the clipboard",
    })
  }

  return (
    <Alert>
      <Icons.server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Icons.copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
