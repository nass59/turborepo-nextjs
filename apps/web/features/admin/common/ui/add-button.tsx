'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '@/constants/routes';

type Props = {
  labels: {
    add: string;
  };
  path: string;
};

export const AddButton = ({ labels, path }: Props) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}${path}`);
  };

  return (
    <Button onClick={() => onClick()}>
      <PlusIcon className="mr-2 size-4" />
      {labels.add}
    </Button>
  );
};
