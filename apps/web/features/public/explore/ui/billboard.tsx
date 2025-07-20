import Image from "next/image";

import { type BillboardModel } from "@/lib/database/models/Billboard";

type Props = {
  data: BillboardModel;
};

export const Billboard = ({ data }: Props) => {
  return (
    <div className="relative block w-full overflow-hidden">
      <div className="flex py-44">
        <div className="z-[1] container flex items-center">
          <div className="max-w-xs pl-2 text-white sm:max-w-2xl">
            <h2 className="font-heading pt-14 pb-7 text-4xl font-bold sm:text-5xl lg:text-8xl">
              {data?.label}
            </h2>
          </div>
        </div>

        <figure className="absolute top-0 left-0 size-full object-cover">
          <Image
            src={data?.imageUrl}
            alt={data?.label}
            fill
            className="z-0 object-cover object-center brightness-[0.6]"
          />
        </figure>

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900"></div>
      </div>
    </div>
  );
};
