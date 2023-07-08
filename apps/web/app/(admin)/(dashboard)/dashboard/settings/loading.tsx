import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/dashboard/dashboard-header-page"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />

      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
