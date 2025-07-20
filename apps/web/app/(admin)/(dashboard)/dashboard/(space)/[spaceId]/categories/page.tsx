import { DataTable, Separator } from "@workspace/ui";

import { CATEGORY_LABELS } from "@/features/admin/category/constants/category";
import { columnsData } from "@/features/admin/category/ui/columns";
import { getAllCategories } from "@/features/admin/category/utilities/category";
import { ApiList } from "@/features/admin/common/ui/api-list";
import { ListHeading } from "@/features/admin/common/ui/list-heading";
import { parseData } from "@/lib/utils";

type Props = {
  params: {
    spaceId: string;
  };
};

export default async function Page({ params }: Props) {
  const categories = await getAllCategories(params.spaceId);
  const { list: listLabels, api: apiLabels, resource } = CATEGORY_LABELS;

  return (
    <>
      <ListHeading
        labels={listLabels}
        value={categories.length}
        path={`/${resource}/new`}
      />

      <DataTable
        columns={columnsData}
        data={parseData(categories)}
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
