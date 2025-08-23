/** biome-ignore-all lint/suspicious/noExplicitAny: default */
import { Button } from '@workspace/design-system/components/ui/button';
import { ImageIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

type Props = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  maxFiles: number;
};

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
  maxFiles,
}: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            className="relative size-[280px] overflow-hidden rounded-md"
            key={url}
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="icon"
                type="button"
                variant="destructive"
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>

            <Image
              alt="Image"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={url}
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        onUpload={onUpload}
        options={{
          sources: ['local', 'unsplash'],
          defaultSource: 'local',
          multiple: true,
          maxFiles,
          clientAllowedFormats: ['webp', 'jpg', 'jpeg', 'png'],
          maxFileSize: 1_500_000,
          theme: 'minimal',
          showAdvancedOptions: false,
          styles: {
            palette: {
              window: '#FFFFFF',
              sourceBg: '#FFFFFF',
              windowBorder: '#000000',
              tabIcon: '#000000',
              inactiveTabIcon: '#3E3E3E',
              menuIcons: '#555a5f',
              link: '#FFC904',
              action: '#339933',
              inProgress: '#7AFF04',
              complete: '#339933',
              error: '#cc0000',
              textDark: '#000000',
              textLight: '#fcfffd',
            },
          },
        }}
        uploadPreset="x5ae8xs1"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              disabled={disabled}
              onClick={onClick}
              type="button"
              variant="secondary"
            >
              <ImageIcon className="mr-2 size-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
