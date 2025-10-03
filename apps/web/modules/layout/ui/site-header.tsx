import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { SiteHeaderAuth } from '@/modules/layout/ui/site-header-auth';
import { SiteHeaderLinks } from '@/modules/layout/ui/site-header-links';

const DATA = {
  title: 'TechShip',
  href: routes.home,
};

/**
 * Global site header containing primary navigation.
 * Server component (no client interactivity here).
 */
export const SiteHeader = () => (
  <header
    className="fixed top-0 z-30 w-full bg-gradient-to-b from-transparent via-gray-900/5 to-gray-950/20 backdrop-blur-md"
    data-a11y="site-header"
    id="site-header"
  >
    <nav
      aria-label="Primary"
      className="grid grid-cols-12 items-center justify-between border-orange-300/12 border-b mix-blend-overlay"
      data-a11y="primary-nav"
    >
      <Link
        aria-labelledby="site-title"
        className="focus-outline col-span-2 flex w-[168px] shrink-0 items-center gap-2 p-4 md:w-[268px] md:border-orange-300/12 md:border-r md:p-4"
        data-a11y="home-link"
        href={DATA.href}
        rel="noopener noreferrer"
      >
        <Image alt="Vibe" height={24} src="/logo.svg" width={24} />
        <h1
          className="bg-clip-text font-bold text-lg text-slate-200 tracking-tighter"
          id="site-title"
        >
          {DATA.title}
        </h1>
      </Link>
      <div
        className="relative col-span-10 flex items-center justify-end"
        data-a11y="header-links-wrapper"
      >
        <SiteHeaderAuth />
        <SiteHeaderLinks />
      </div>
    </nav>
  </header>
);
