'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/design-system/components/ui/resizable';
import { Suspense } from 'react';
import { MessagesContainer } from '@/modules/projects/ui/components/messages-container';

type Props = {
  projectId: string;
};

export const ProjectView = ({ projectId }: Props) => {
  return (
    <div className="h-[calc(100vh-80px)]">
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
