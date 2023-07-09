// import { notFound } from "next/navigation"

// import { dashboardConfig } from "@/config/dashboard"
// import { getCurrentUser } from "@/lib/sessions"
// import { DashboardHeader } from "@/components/dashboard/dashboard-header"
// import { DashboardNav } from "@/components/dashboard/dashboard-nav"
// import { SiteFooter } from "@/components/site-footer"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // const user = await getCurrentUser()

  // if (!user) {
  //   return notFound()
  // }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      {/* <DashboardHeader
        user={{
          name: user.name,
          email: user.email,
          image: user.image,
        }}
      />

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>

        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>

      <SiteFooter className="border-t" /> */}

      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}