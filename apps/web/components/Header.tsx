import { MainNav } from "./DesktopNav";

export const Header = () => {
  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <MainNav />
      </div>
    </header>
  );
};
