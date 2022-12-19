export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
};

export type SiteConfig = {
  name: string;
  links: {
    twitter: string;
    github: string;
    terms: string;
    privacy: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};
