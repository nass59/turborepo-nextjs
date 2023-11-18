"use client"

import Image from "next/image"
import { Tab } from "@headlessui/react"

import GalleryTab from "./gallery-tab"

interface GalleryProps {
  images: string[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {images.length > 1 && (
        <div className="mt-6 hidden sm:block">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images.map((image) => (
              <GalleryTab key={image} image={image} />
            ))}
          </Tab.List>
        </div>
      )}

      <Tab.Panels>
        {images.map((image) => (
          <Tab.Panel key={image}>
            <div className="relative aspect-square h-full w-full overflow-hidden rounded-lg">
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
    </Tab.Group>
  )
}

export default Gallery
