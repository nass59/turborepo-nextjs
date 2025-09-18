'use client';

import { useMutation } from '@tanstack/react-query';
import { Button } from '@workspace/design-system/components/ui/button';
import { Input } from '@workspace/design-system/components/ui/input';
import { toast } from '@workspace/design-system/components/ui/sonner';
import { useState } from 'react';
import { useTRPC } from '@/trpc/client';

export const HomeClient = () => {
  const [value, setValue] = useState('');

  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success('Inngest function invoked successfully!');
      },
    })
  );

  return (
    <div className="max-w-7xl p-4">
      <Input onChange={(e) => setValue(e.target.value)} value={value} />
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value })}
      >
        Invoke Inngest
      </Button>
    </div>
  );
};
