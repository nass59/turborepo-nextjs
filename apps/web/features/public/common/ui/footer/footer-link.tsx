type Props = {
  href: string
  title: string
}

export const FooterLink = ({ href, title }: Props) => {
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
