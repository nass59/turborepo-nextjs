'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@workspace/design-system/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useTRPC } from '@/trpc/client';

export const ProjectsList = () => {
  const trpc = useTRPC();
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  return (
    <div className="flex w-full flex-col gap-y-6 rounded-xl border bg-white p-8 sm:gap-y-4 dark:bg-sidebar">
      <h2 className="font-semibold text-2xl">Saved Vibes</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-muted-foreground text-sm">
              No projects yet. Create one above!
            </p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            asChild
            className="h-auto w-full justify-start p-4 text-start font-normal"
            key={project.id}
            variant="outline"
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Image
                  alt="Vibe"
                  className="object-contain"
                  height={32}
                  src="/logo2.svg"
                  width={32}
                />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
