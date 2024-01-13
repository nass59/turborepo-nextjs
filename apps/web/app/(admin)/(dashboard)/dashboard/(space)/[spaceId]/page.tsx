import { parseData } from "@/lib/utils"
import { Heading } from "@shared/ui"
import { Icons } from "@/components/icons"
import { getOverview } from "@/features/admin/common/utilities/overview"
import { CardOverview } from "@/features/admin/home/ui/card-overview"
import { Chart } from "@/features/admin/home/ui/chart"

type Props = {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: Props) {
  const overview = await getOverview(params.spaceId)

  return (
    <>
      <Heading title="Dashboard" description="Overview of your space" />

      <div className="grid grid-cols-3 gap-4">
        <CardOverview
          title="Total Billboards"
          icon={<Icons.logo className="h-6 w-6" />}
          value={overview.totalBillboards}
        />

        <CardOverview
          title="Total Categories"
          icon={<Icons.space className="h-6 w-6" />}
          value={overview.totalCategories}
        />

        <CardOverview
          title="Total Items"
          icon={<Icons.media className="h-6 w-6" />}
          value={overview.totalItems}
        />

        <CardOverview className="col-span-3" title="Overview (Items by month)">
          <Chart data={parseData(overview.monthlyItems)} />
        </CardOverview>
      </div>
    </>
  )
}
