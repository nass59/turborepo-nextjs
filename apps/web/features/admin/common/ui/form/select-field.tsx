import { type Control } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui"
import { type BillboardColumn } from "@/features/admin/billboard/ui/columns"

type Props = {
  labels: {
    name: string
    label: string
    placeholder: string
  }
  loading?: boolean
  control: Control<any>
  options: BillboardColumn[]
}

export const SelectField = ({ labels, loading, control, options }: Props) => {
  return (
    <FormField
      control={control}
      name={labels.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labels.label}</FormLabel>
          <Select
            disabled={loading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  defaultValue={field.value}
                  placeholder={labels.placeholder}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
