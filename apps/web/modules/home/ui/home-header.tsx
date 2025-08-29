import { ShipWheelIcon } from 'lucide-react';
import { HeaderLinks } from '@/modules/home/ui/header-links';

const DATA = {
  title: 'TechShip',
  href: '/',
};

export const Header = () => {
  return (
    <div className="fixed top-0 z-30 flex w-full flex-col bg-gradient-to-b from-transparent via-gray-900/5 to-gray-950/20 backdrop-blur-md">
      <nav className="grid grid-cols-12 items-center justify-between border-orange-300/12 border-b mix-blend-overlay">
        <a
          className="col-span-2 flex w-[268px] shrink-0 items-center gap-2 border-orange-300/12 border-r p-4 md:p-4"
          href={DATA.href}
        >
          <ShipWheelIcon className="inline size-5 text-primary" />
          <span className="bg-clip-text font-bold text-lg text-slate-200 tracking-tighter">
            {DATA.title}
          </span>
        </a>
        <div className="relative col-span-10 flex items-center justify-end">
          <HeaderLinks />
        </div>
      </nav>
    </div>
  );
};
