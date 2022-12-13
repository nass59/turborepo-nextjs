import { Icons } from "@components/icons";
import { siteConfig } from "@config/site";
import { FooterLink } from "./FooterLink";

export function Footer() {
  return (
    <footer className="container bg-white text-slate-600">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-t-slate-200 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col text-sm items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <FooterLink href={siteConfig.links.twitter} title="@nass190" />.
            Hosted on <FooterLink href="https://vercel.com" title="Vercel" />.
          </p>
        </div>

        <p className="text-center text-sm md:text-left">
          The source code is available on{" "}
          <FooterLink href={siteConfig.links.github} title="Github" />.
        </p>
      </div>
    </footer>
  );
}
