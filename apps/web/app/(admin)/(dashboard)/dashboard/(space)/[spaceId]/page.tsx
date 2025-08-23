import { BookmarkIcon, ImageIcon, RocketIcon } from 'lucide-react';

import { Heading } from '@/components/heading';
import { getOverview } from '@/features/admin/common/utilities/overview';
import { CardOverview } from '@/features/admin/home/ui/card-overview';
import { Chart } from '@/features/admin/home/ui/chart';
import { parseData } from '@/lib/utils';

type Props = {
  params: Promise<{
    spaceId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { spaceId } = await params;
  const overview = await getOverview(spaceId);

  return (
    <>
      <Heading description="Overview of your space" title="Dashboard" />

      <div className="grid grid-cols-3 gap-4">
        <CardOverview
          icon={<RocketIcon className="size-6" />}
          title="Total Billboards"
          value={overview.totalBillboards}
        />

        <CardOverview
          icon={<BookmarkIcon className="size-6" />}
          title="Total Categories"
          value={overview.totalCategories}
        />

        <CardOverview
          icon={<ImageIcon className="size-6" />}
          title="Total Items"
          value={overview.totalItems}
        />

        <CardOverview className="col-span-3" title="Overview (Items by month)">
          <Chart data={parseData(overview.monthlyItems)} />
        </CardOverview>
      </div>
    </>
  );
}
