import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ProjectView } from '@/modules/projects/ui/views/project-view';
import { getQueryClient, trpc } from '@/trpc/server';

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function Page({ params }: Props) {
  const { projectId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );

  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  return (
    <div className="pt-18">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading project...</div>}>
          <ProjectView projectId={projectId} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
