/** biome-ignore-all lint/suspicious/noExplicitAny: default */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/design-system/components/ui/form';
import type { Control } from 'react-hook-form';

import { ImageUpload } from '../image-upload';

type Props = {
  labels: {
    name: string;
    label: string;
  };
  loading?: boolean;
  control: Control<any>;
};

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
              disabled={loading}
              maxFiles={1}
              onChange={(url) => field.onChange(url)}
              onRemove={() => field.onChange('')}
              value={field.value ? [field.value] : []}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
