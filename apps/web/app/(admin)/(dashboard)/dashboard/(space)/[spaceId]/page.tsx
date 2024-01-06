import { parseData } from "@/lib/utils"
import { Heading, HeadingDescription, HeadingTitle } from "@shared/ui"
import { Icons } from "@/components/icons"
import { CardOverview } from "@/features/dashboard/ui/card-overview"
import { Chart } from "@/features/dashboard/ui/chart"
import { getOverview } from "@/features/dashboard/utilities/overview"

type Props = {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: Props) {
  const { spaceId } = params
  const overview = await getOverview(spaceId)

  return (
    <>
      <Heading>
        <HeadingTitle>Dashboard</HeadingTitle>
        <HeadingDescription>Overview of your space</HeadingDescription>
      </Heading>

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
