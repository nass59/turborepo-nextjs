'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/design-system/components/ui/resizable';
import { Suspense } from 'react';
import { MessagesContainer } from '@/modules/projects/ui/components/messages-container';
import { useTRPC } from '@/trpc/client';

type Props = {
  projectId: string;
};

export const ProjectView = ({ projectId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="flex min-h-0 flex-col"
          defaultSize={35}
          minSize={20}
        >
          <Suspense fallback={<div>Loading messages...</div>}>
            <MessagesContainer projectId={projectId} />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className="flex min-h-0 flex-col"
          defaultSize={65}
          minSize={50}
        >
          <h2 className="mb-2 font-semibold text-xl">Messages:</h2>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
