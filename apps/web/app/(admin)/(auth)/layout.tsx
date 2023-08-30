import { type ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

/**
 * AuthLayout is a layout component for the authentication pages.
 * It centers its children components both vertically and horizontally.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}
