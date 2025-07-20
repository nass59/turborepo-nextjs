import { type Control } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui"

import { ImageUpload } from "../image-upload"

type Props = {
  labels: {
    name: string
    label: string
  }
  loading?: boolean
  control: Control<any>
}

export const ImageField = ({ labels, loading, control }: Props) => {
  return (
    <FormField
      control={control}
      name={labels.name}
      render={({ field }) => (
        <FormItem className="col-span-3">
          <FormLabel>{labels.label}</FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value ? [field.value] : []}
              disabled={loading}
              onChange={(url) => field.onChange(url)}
              onRemove={() => field.onChange("")}
              maxFiles={1}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
