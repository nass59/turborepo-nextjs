import { DataTable, Separator } from "@workspace/design-system/components/ui";

import { BILLBOARD_LABELS } from "@/features/admin/billboard/constants/billboard";
import { columnsData } from "@/features/admin/billboard/ui/columns";
import { getAllBillboards } from "@/features/admin/billboard/utilities/billboard";
import { ApiList } from "@/features/admin/common/ui/api-list";
import { ListHeading } from "@/features/admin/common/ui/list-heading";
import { parseData } from "@/lib/utils";

type Props = {
  params: {
    spaceId: string;
  };
};

export default async function Page({ params }: Props) {
  const billboards = await getAllBillboards(params.spaceId);
  const { list: listLabels, api: apiLabels, resource } = BILLBOARD_LABELS;

  return (
    <>
      <ListHeading
        labels={listLabels}
        value={billboards.length}
        path={`/${resource}/new`}
      />

      <DataTable
        columns={columnsData}
        data={parseData(billboards)}
        searchKey="label"
      />

      <Separator />

      <ApiList
        resource={resource}
        resourceId={apiLabels.resourceId}
        spaceId={params.spaceId}
      />
    </>
  );
}
