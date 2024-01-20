import { type Control } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui"

import { ImageUpload } from "../image-upload"

type Props = {
  labels: {
    name: string
    label: string
  }
  loading?: boolean
  control: Control<any>
}

export const MultiImagesField = ({ labels, loading, control }: Props) => {
  return (
    <FormField
      control={control}
      name={labels.name}
      render={({ field }) => (
        <FormItem className="col-span-3">
          <FormLabel>{labels.label}</FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value.map((image: string) => image)}
              disabled={loading}
              onChange={(url) => {
                field.onChange([...field.value, url])
              }}
              onRemove={(url) =>
                field.onChange([
                  ...field.value.filter((current: string) => current !== url),
                ])
              }
              maxFiles={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
