import { marketingConfig } from "@config/marketing";
import { MainNav } from "@components/MainNav";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <MainNav items={marketingConfig.mainNav} />
        <nav>
          <Link
            href="/login"
            className="relative inline-flex h-8 bg-blue-600 border border-transparent rounded-md px-6 py-1 text-sm text-white font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};
