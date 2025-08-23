type Props = {
  href: string;
  title: string;
};

export const FooterLink = ({ href, title }: Props) => {
  return (
    <a
      className="font-medium underline underline-offset-4"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {title}
    </a>
  );
};
