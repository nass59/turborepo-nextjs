'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@workspace/design-system/components/ui/button';
import { Input } from '@workspace/design-system/components/ui/input';
import { toast } from '@workspace/design-system/components/ui/sonner';
import { useState } from 'react';
import { useTRPC } from '@/trpc/client';

export const HomeClient = () => {
  const [value, setValue] = useState('');

  const trpc = useTRPC();
  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success('Message created!');
      },
    })
  );

  return (
    <div className="max-w-7xl p-4">
      <Input onChange={(e) => setValue(e.target.value)} value={value} />
      <Button
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({ value })}
      >
        Invoke Inngest
      </Button>
      {JSON.stringify(messages, null, 2)}
    </div>
  );
};
