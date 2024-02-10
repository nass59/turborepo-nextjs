import { RocketIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"

import { FooterLink } from "./footer-link"

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 text-sm md:flex-row md:gap-2 md:px-0">
          <RocketIcon className="size-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <FooterLink href={siteConfig.links.twitter} title="@nass190" />.
            Hosted on <FooterLink href="https://vercel.com" title="Vercel" />.
            See <FooterLink href={siteConfig.links.terms} title="terms" /> and{" "}
            <FooterLink href={siteConfig.links.privacy} title="privacy" />.
          </p>
        </div>

        <p className="text-center text-sm md:text-left">
          The source code is available on{" "}
          <FooterLink href={siteConfig.links.github} title="Github" />.
        </p>
      </div>
    </footer>
  )
}
