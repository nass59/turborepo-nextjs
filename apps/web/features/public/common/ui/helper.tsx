'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/design-system/components/ui/popover';
import { BellIcon } from 'lucide-react';
import Image from 'next/image';
import OgImage from 'public/og-light.jpg';
import { siteConfig } from '@/config/site';

export const Help = () => {
  return (
    <div>
      <div>
        <Popover>
          <PopoverTrigger className="fixed right-8 bottom-4 inline-flex size-10 items-center justify-center rounded-full border bg-slate-900 text-white">
            <BellIcon className="size-5" />
            <span className="sr-only">Toggle</span>
          </PopoverTrigger>
          <PopoverContent className="mr-8 mb-1 w-[300px] bg-slate-900 p-4 text-sm text-white">
            <div className="grid gap-4">
              <Image
                alt="Screenshot"
                className="overflow-hidden rounded-sm"
                src={OgImage}
              />
              <p>
                This app is a work in progress. I&apos;m building this in
                public.
              </p>
              <p>
                You can follow the progress on{' '}
                <a
                  className="border-b border-b-white"
                  href={siteConfig.links.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
