import { type LayoutProps } from "@/types/common"

/**
 * AuthLayout is a layout component for the authentication pages.
 * It centers its children components both vertically and horizontally.
 */
export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}
