import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@workspace/design-system/components/ui/button';
import { Form, FormField } from '@workspace/design-system/components/ui/form';
import { toast } from '@workspace/design-system/components/ui/sonner';
import { cn } from '@workspace/design-system/lib/utils';
import { ArrowUpIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutoSize from 'react-textarea-autosize';
import { z } from 'zod';
import { useTRPC } from '@/trpc/client';

type Props = {
  projectId: string;
};

const MAX_VALUE_LENGTH = 10_000;

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: 'Value is required' })
    .max(MAX_VALUE_LENGTH, { message: 'Value is too long' }),
});

export const MessageForm = ({ projectId }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: '' },
  });

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.messages.getMany.queryOptions({ projectId })
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createMessage.mutateAsync({
      value: values.value,
      projectId,
    });
  };

  const isPending = createMessage.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;

  return (
    <Form {...form}>
      <form
        className={cn(
          'relative rounded-xl border bg-sidebar p-4 pt-1 transition-all dark:bg-sidebar',
          isFocused && 'shadow-xs'
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextareaAutoSize
              {...field}
              className="w-full resize-none border-none bg-transparent pt-4 outline-none"
              disabled={isPending}
              maxRows={8}
              minRows={2}
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
              placeholder="What would you like to build?"
            />
          )}
        />
        <div className="flex items-end justify-between gap-x-2 pt-2">
          <div className="font-mono text-[10px] text-muted-foreground">
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground">
              <span>&#8984;</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            className={cn(
              'size-8 rounded-full',
              isButtonDisabled && 'border bg-muted-foreground'
            )}
            disabled={isButtonDisabled}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
