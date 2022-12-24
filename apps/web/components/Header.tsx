import { marketingConfig } from "@config/marketing";
import { MainNav } from "@components/MainNav";
import Link from "next/link";
import { siteConfig } from "@config/site";

export const Header = () => {
  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <MainNav items={marketingConfig.mainNav} />
        <nav className="flex gap-2">
          <Link
            href="/login"
            className="relative inline-flex h-8 rounded-md border border-transparent bg-yellow-400 px-6 py-1 text-sm font-semibold text-slate-800 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
          >
            Login
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex h-8 rounded-md border border-transparent bg-slate-800 px-6 py-1 text-sm font-semibold text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
          >
            Github
          </Link>
        </nav>
      </div>
    </header>
  );
};
