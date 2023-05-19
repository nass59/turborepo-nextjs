"use client"

import Image from "next/image"
import OgImage from "public/og-light.jpg"

import { siteConfig } from "@config/site"
import { Popover } from "@components/Popover"
import { Icons } from "@components/icons"

export const Help = () => {
  return (
    <div>
      <div>
        <Popover>
          <Popover.Trigger className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-slate-900 text-white">
            <Icons.bell className="h-5 w-5" />
            <span className="sr-only">Toggle</span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="mb-1 bg-slate-900 p-4 text-sm text-white">
              <div className="grid w-[300px] gap-4">
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
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </div>
    </div>
  )
}
