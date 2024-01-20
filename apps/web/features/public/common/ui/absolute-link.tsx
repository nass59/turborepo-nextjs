import { type Route } from "next"
import Link from "next/link"

type AbsoluteLinkProps = {
  href: Route
  accessibleTitle: string
}

export const AbsoluteLink = ({ href, accessibleTitle }: AbsoluteLinkProps) => {
  return (
    <Link
      href={href}
      className="absolute inset-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
    >
      <h2 className="sr-only">{accessibleTitle}</h2>
    </Link>
  )
}
