"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "@shared/ui"
import { Icons } from "@/components/icons"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
  maxFiles: number
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  maxFiles,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[280px] w-[280px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            </div>

            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>

      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="x5ae8xs1"
        options={{
          sources: ["local", "unsplash"],
          defaultSource: "local",
          multiple: true,
          maxFiles: maxFiles,
          clientAllowedFormats: ["webp", "jpg", "jpeg", "png"],
          maxFileSize: 1500000,
          theme: "minimal",
          showAdvancedOptions: false,
          styles: {
            palette: {
              window: "#FFFFFF",
              sourceBg: "#FFFFFF",
              windowBorder: "#000000",
              tabIcon: "#000000",
              inactiveTabIcon: "#3E3E3E",
              menuIcons: "#555a5f",
              link: "#FFC904",
              action: "#339933",
              inProgress: "#7AFF04",
              complete: "#339933",
              error: "#cc0000",
              textDark: "#000000",
              textLight: "#fcfffd",
            },
          },
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <Icons.mediaPlus className="mr-2 h-4 w-4" />
              Upload an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
