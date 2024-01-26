"use client"

import Image from "next/image"
import { Tab } from "@headlessui/react"

import { GalleryTab } from "./gallery-tab"

type Props = {
  images: string[]
}

export const Gallery = ({ images }: Props) => {
  return (
    <Tab.Group as="div" className="flex flex-col">
      <Tab.Panels>
        {images.map((image) => (
          <Tab.Panel key={image}>
            <div className="relative aspect-poster size-full overflow-hidden rounded-lg">
              <Image
                src={image}
                fill
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>

      {images.length > 1 && (
        <div className="mt-3 hidden sm:block">
          <Tab.List className="grid grid-cols-4 gap-2">
            {images.map((image) => (
              <GalleryTab key={image} image={image} />
            ))}
          </Tab.List>
        </div>
      )}
    </Tab.Group>
  )
}
