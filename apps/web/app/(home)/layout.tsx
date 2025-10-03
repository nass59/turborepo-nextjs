import type { LayoutProps } from '@/types/common';

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <div className="flex max-h-screen min-h-screen flex-col">
      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="-z-10 absolute inset-0 h-full w-full" />
        {children}
      </div>
    </div>
  );
}
