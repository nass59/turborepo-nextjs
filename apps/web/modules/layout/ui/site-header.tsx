import { ShipWheelIcon } from 'lucide-react';
import { routes } from '@/constants/routes';
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
      <a
        aria-labelledby="site-title"
        className="focus-outline col-span-2 flex w-[268px] shrink-0 items-center gap-2 border-orange-300/12 border-r border-b p-4 md:p-4"
        data-a11y="home-link"
        href={DATA.href}
        rel="noopener noreferrer"
      >
        <ShipWheelIcon
          aria-hidden="true"
          className="inline size-5 text-primary"
        />
        <h1
          className="bg-clip-text font-bold text-lg text-slate-200 tracking-tighter"
          id="site-title"
        >
          {DATA.title}
        </h1>
      </a>
      <div
        className="relative col-span-10 flex items-center justify-end"
        data-a11y="header-links-wrapper"
      >
        <SiteHeaderLinks />
      </div>
    </nav>
  </header>
);
