import Image from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@workspace/design-system/lib/utils";

type Props = {
  image: string;
};

export const GalleryTab = ({ image }: Props) => {
  return (
    <Tab className="aspect-poster relative flex cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div>
          <span className="size-full overflow-hidden rounded-md">
            <Image
              src={image}
              fill
              alt="Image"
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          ></span>
        </div>
      )}
    </Tab>
  );
};
