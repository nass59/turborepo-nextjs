import { getAllBillboards } from '@/features/admin/billboard/utilities/billboard';
import { CATEGORY_LABELS } from '@/features/admin/category/constants/category';
import { CategoryForm } from '@/features/admin/category/ui/form';
import { getCategory } from '@/features/admin/category/utilities/category';
import { FormContentHeading } from '@/features/admin/common/ui/form-content-heading';
import { parseData } from '@/lib/utils';

type Props = {
  params: Promise<{
    spaceId: string;
    categoryId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { spaceId, categoryId } = await params;

  const category = await getCategory(categoryId);
  const billboards = await getAllBillboards(spaceId);

  return (
    <>
      <FormContentHeading isEdit={Boolean(category)} labels={CATEGORY_LABELS} />

      <CategoryForm
        billboards={parseData(billboards)}
        initialData={parseData(category)}
      />
    </>
  );
}
