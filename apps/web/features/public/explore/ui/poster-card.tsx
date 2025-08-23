import Image from "next/image";

import { Badge } from "@workspace/design-system/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@workspace/design-system/components/ui/card";

import { AbsoluteLink } from "@/features/public/common/ui/absolute-link";
import { type ItemModel } from "@/lib/database/models/Item";

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
          src={data?.images?.[0] || ""}
          alt="Image"
          fill
          className="rounded-sm object-cover"
        />
        <AbsoluteLink
          href={`/explore/${data._id}`}
          accessibleTitle={data.name}
        />
      </CardContent>
      {/* <CardFooter>
        <PreviewBtn data={parseData(data)} />
      </CardFooter> */}
    </Card>
  );
};
