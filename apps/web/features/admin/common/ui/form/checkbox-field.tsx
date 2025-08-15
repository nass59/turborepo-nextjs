import { type Control } from "react-hook-form";

import { Checkbox } from "@workspace/design-system/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/design-system/components/ui/form";

type Props = {
  labels: {
    name: string;
    label: string;
    description: string;
  };
  loading?: boolean;
  control: Control<any>;
};

export const CheckboxField = ({ labels, control }: Props) => {
  return (
    <FormField
      control={control}
      name={labels.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>

          <div className="space-y-1 leading-none">
            <FormLabel>{labels.label}</FormLabel>
            <FormDescription>{labels.description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};
