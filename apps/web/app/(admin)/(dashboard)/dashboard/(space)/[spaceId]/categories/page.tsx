import { DataTable } from "@workspace/design-system/components/ui/data-table";
import { Separator } from "@workspace/design-system/components/ui/separator";

import { CATEGORY_LABELS } from "@/features/admin/category/constants/category";
import { columnsData } from "@/features/admin/category/ui/columns";
import { getAllCategories } from "@/features/admin/category/utilities/category";
import { ApiList } from "@/features/admin/common/ui/api-list";
import { ListHeading } from "@/features/admin/common/ui/list-heading";
import { parseData } from "@/lib/utils";

type Props = {
  params: Promise<{
    spaceId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { spaceId } = await params;
  const categories = await getAllCategories(spaceId);
  const { list: listLabels, api: apiLabels, resource } = CATEGORY_LABELS;

  return (
    <>
      <ListHeading
        labels={listLabels}
        value={categories.length}
        path={`/${resource}/new`}
      />

      <DataTable columns={columnsData} data={parseData(categories)} />

      <Separator />

      <ApiList
        resource={resource}
        resourceId={apiLabels.resourceId}
        spaceId={spaceId}
      />
    </>
  );
}
