import { Badge } from '@workspace/design-system/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
} from '@workspace/design-system/components/ui/card';
import Image from 'next/image';

import { AbsoluteLink } from '@/features/public/common/ui/absolute-link';
import type { ItemModel } from '@/lib/database/models/item';

type Props = {
  data: ItemModel;
};

export const PosterCard = ({ data }: Props) => {
  return (
    <Card variant="poster">
      <CardHeader isAbsolute>
        <Badge>{data.category}</Badge>
      </CardHeader>
      <CardContent isPoster>
        <Image
          alt="Image"
          className="rounded-sm object-cover"
          fill
          src={data?.images?.[0] || ''}
        />
        <AbsoluteLink
          accessibleTitle={data.name}
          href={`/explore/${data._id}`}
        />
      </CardContent>
    </Card>
  );
};
