import { MarketingConfig } from "types"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Documentation",
      href: "/docs",
      disabled: false,
    },
    {
      title: "Contact",
      href: "/contact",
      disabled: true,
    },
  ],
}
