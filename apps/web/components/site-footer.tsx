import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { SiteFooterLink } from "@/components/site-footer-link"

export const SiteFooter = () => {
  return (
    <footer className="container bg-white text-slate-600">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-t-slate-200 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 text-sm md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <SiteFooterLink href={siteConfig.links.twitter} title="@nass190" />.
            Hosted on{" "}
            <SiteFooterLink href="https://vercel.com" title="Vercel" />. See{" "}
            <SiteFooterLink href={siteConfig.links.terms} title="terms" /> and{" "}
            <SiteFooterLink href={siteConfig.links.privacy} title="privacy" />.
          </p>
        </div>

        <p className="text-center text-sm md:text-left">
          The source code is available on{" "}
          <SiteFooterLink href={siteConfig.links.github} title="Github" />.
        </p>
      </div>
    </footer>
  )
}
