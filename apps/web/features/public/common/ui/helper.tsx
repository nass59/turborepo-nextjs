"use client"

import Image from "next/image"
import { BellIcon } from "@radix-ui/react-icons"
import OgImage from "public/og-light.jpg"

import { siteConfig } from "@/config/site"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui"

export const Help = () => {
  return (
    <div>
      <div>
        <Popover>
          <PopoverTrigger className="fixed bottom-4 right-8 inline-flex size-10 items-center justify-center rounded-full border bg-slate-900 text-white">
            <BellIcon className="size-5" />
            <span className="sr-only">Toggle</span>
          </PopoverTrigger>
          <PopoverContent className="mb-1 mr-8 w-[300px] bg-slate-900 p-4 text-sm text-white">
            <div className="grid gap-4">
              <Image
                src={OgImage}
                alt="Screenshot"
                className="overflow-hidden rounded-sm"
              />
              <p>
                This app is a work in progress. I&apos;m building this in
                public.
              </p>
              <p>
                You can follow the progress on{" "}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-b-white"
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
  )
}
