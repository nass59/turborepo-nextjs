import { BookmarkIcon, ImageIcon, RocketIcon } from "@radix-ui/react-icons"

import { parseData } from "@/lib/utils"
import { Heading } from "@shared/ui"
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
          icon={<RocketIcon className="size-6" />}
          value={overview.totalBillboards}
        />

        <CardOverview
          title="Total Categories"
          icon={<BookmarkIcon className="size-6" />}
          value={overview.totalCategories}
        />

        <CardOverview
          title="Total Items"
          icon={<ImageIcon className="size-6" />}
          value={overview.totalItems}
        />

        <CardOverview className="col-span-3" title="Overview (Items by month)">
          <Chart data={parseData(overview.monthlyItems)} />
        </CardOverview>
      </div>
    </>
  )
}
