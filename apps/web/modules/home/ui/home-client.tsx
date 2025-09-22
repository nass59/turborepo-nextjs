'use client';

import { useMutation } from '@tanstack/react-query';
import { Button } from '@workspace/design-system/components/ui/button';
import { Input } from '@workspace/design-system/components/ui/input';
import { toast } from '@workspace/design-system/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTRPC } from '@/trpc/client';

export const HomeClient = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const trpc = useTRPC();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="flex max-w-7xl items-center justify-center">
      <div className="mx-auto flex flex-col items-center justify-center gap-y-4">
        <Input onChange={(e) => setValue(e.target.value)} value={value} />
        <Button
          disabled={createProject.isPending}
          onClick={() => createProject.mutate({ value })}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
