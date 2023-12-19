import { countAllBillboardsBySpaceId } from "@/lib/database/billboard"
import { countAllCategoriesBySpaceId } from "@/lib/database/category"
import {
  countAllItemsByMonthBySpaceId,
  countAllItemsBySpaceId,
} from "@/lib/database/items"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Separator,
} from "@shared/ui"
import { Overview } from "@/components/dashboard/dashboard-overview"
import { Icons } from "@/components/icons"

interface DashboardSpaceProps {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches the first space with the given spaceId from the database.
 * It then displays the name of the active space.
 */
const Page = async ({ params }: DashboardSpaceProps) => {
  const { spaceId } = params

  const totalBillboards = await countAllBillboardsBySpaceId(spaceId)
  const totalCategories = await countAllCategoriesBySpaceId(spaceId)
  const totalItems = await countAllItemsBySpaceId(spaceId)

  const monthlyItems = await countAllItemsByMonthBySpaceId(spaceId)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your space" />

        <Separator />

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Billboards
              </CardTitle>
              <Icons.logo className="h-6 w-6" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-bold">{totalBillboards}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Categories
              </CardTitle>
              <Icons.space className="h-6 w-6" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-bold">{totalCategories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Icons.media className="h-6 w-6" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-bold">{totalItems}</div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Overview (Items by month)</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pl-2 pt-0">
              <Overview data={monthlyItems} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
