interface FooterLinkProps {
  href: string;
  title: string;
}

export const FooterLink = ({ href, title }: FooterLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium underline underline-offset-4"
    >
      {title}
    </a>
  );
};
