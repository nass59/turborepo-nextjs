import { DataTable } from '@workspace/design-system/components/ui/data-table';
import { Separator } from '@workspace/design-system/components/ui/separator';

import { BILLBOARD_LABELS } from '@/features/admin/billboard/constants/billboard';
import { columnsData } from '@/features/admin/billboard/ui/columns';
import { getAllBillboards } from '@/features/admin/billboard/utilities/billboard';
import { ApiList } from '@/features/admin/common/ui/api-list';
import { ListHeading } from '@/features/admin/common/ui/list-heading';
import { parseData } from '@/lib/utils';

type Props = {
  params: Promise<{
    spaceId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { spaceId } = await params;
  const billboards = await getAllBillboards(spaceId);
  const { list: listLabels, api: apiLabels, resource } = BILLBOARD_LABELS;

  return (
    <>
      <ListHeading
        labels={listLabels}
        path={`/${resource}/new`}
        value={billboards.length}
      />

      <DataTable columns={columnsData} data={parseData(billboards)} />

      <Separator />

      <ApiList
        resource={resource}
        resourceId={apiLabels.resourceId}
        spaceId={spaceId}
      />
    </>
  );
}
