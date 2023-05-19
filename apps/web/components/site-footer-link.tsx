interface SiteFooterLinkProps {
  href: string
  title: string
}

export const SiteFooterLink = ({ href, title }: SiteFooterLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium underline underline-offset-4"
    >
      {title}
    </a>
  )
}
