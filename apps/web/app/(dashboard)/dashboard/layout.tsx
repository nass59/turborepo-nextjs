import { DashboardHeader } from "@components/DashboardHeader";
import { DashboardNav } from "@components/DashboardNav";
import { dashboardConfig } from "@config/dashboard";
import { getCurrentUser } from "@lib/sessions";
import { notFound } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <DashboardHeader
        user={{
          name: user.name,
          email: user.email,
          image: user.image,
        }}
      />
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
