/** biome-ignore-all lint/suspicious/noExplicitAny: default */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/design-system/components/ui/form';
import { Input } from '@workspace/design-system/components/ui/input';
import type { Control } from 'react-hook-form';

type Props = {
  labels: {
    name: string;
    label: string;
    placeholder: string;
    description?: string;
  };
  loading?: boolean;
  control: Control<any>;
};

export const InputField = ({ labels, loading, control }: Props) => {
  return (
    <FormField
      control={control}
      name={labels.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labels.label}</FormLabel>
          <FormControl>
            <Input
              disabled={loading}
              placeholder={labels.placeholder}
              {...field}
            />
          </FormControl>
          {labels.description && (
            <FormDescription>{labels.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
