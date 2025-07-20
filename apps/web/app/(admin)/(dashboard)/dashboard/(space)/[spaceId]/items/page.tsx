import { DataTable, Separator } from "@workspace/design-system/components/ui";

import { ApiList } from "@/features/admin/common/ui/api-list";
import { ListHeading } from "@/features/admin/common/ui/list-heading";
import { ITEM_LABELS } from "@/features/admin/item/constants/item";
import { columnsData } from "@/features/admin/item/ui/columns";
import { getAllItems } from "@/features/admin/item/utilities/item";
import { parseData } from "@/lib/utils";

type Props = {
  params: {
    spaceId: string;
  };
};

export default async function Page({ params }: Props) {
  const items = await getAllItems(params.spaceId);
  const { list: listLabels, api: apiLabels, resource } = ITEM_LABELS;

  return (
    <>
      <ListHeading
        labels={listLabels}
        value={items.length}
        path={`/${resource}/new`}
      />

      <DataTable
        columns={columnsData}
        data={parseData(items)}
        searchKey="name"
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
