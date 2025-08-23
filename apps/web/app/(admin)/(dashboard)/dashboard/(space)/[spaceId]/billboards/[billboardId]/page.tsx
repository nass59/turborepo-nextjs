import { BILLBOARD_LABELS } from '@/features/admin/billboard/constants/billboard';
import { BillboardForm } from '@/features/admin/billboard/ui/form';
import { getBillboard } from '@/features/admin/billboard/utilities/billboard';
import { FormContentHeading } from '@/features/admin/common/ui/form-content-heading';
import { parseData } from '@/lib/utils';

type Props = {
  params: Promise<{
    billboardId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const billboard = await getBillboard((await params).billboardId);

  return (
    <>
      <FormContentHeading
        isEdit={Boolean(billboard)}
        labels={BILLBOARD_LABELS}
      />

      <BillboardForm initialData={parseData(billboard)} />
    </>
  );
}
