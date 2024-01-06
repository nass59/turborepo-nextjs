import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@shared/ui/components/ui/alert"

import { Badge, type BadgeProps } from "@shared/ui"
import { Icons } from "@/components/icons"

import { CopyButton } from "./copy-button"

type Props = {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
}

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
}

export const Api = ({ title, description, variant = "public" }: Props) => {
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
        <CopyButton
          description={description}
          message="API route copied to the clipboard"
        />
      </AlertDescription>
    </Alert>
  )
}
