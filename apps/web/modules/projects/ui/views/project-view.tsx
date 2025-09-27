'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/design-system/components/ui/resizable';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/design-system/components/ui/tabs';
import { CodeIcon, CrownIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { FileExplorer } from '@/components/file-explorer';
import type { Fragment } from '@/generated/prisma';
import { FragmentWeb } from '@/modules/projects/ui/components/fragment-web';
import { MessagesContainer } from '@/modules/projects/ui/components/messages-container';
import { ProjectHeader } from '@/modules/projects/ui/components/project-header';

type Props = {
  projectId: string;
};

export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<'code' | 'preview'>('preview');

  return (
    <div className="h-[calc(100vh-80px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="flex min-h-0 flex-col"
          defaultSize={35}
          minSize={20}
        >
          <Suspense fallback={<div>Loading project...</div>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>

          <Suspense fallback={<div>Loading messages...</div>}>
            <MessagesContainer
              activeFragment={activeFragment}
              projectId={projectId}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className="flex min-h-0 flex-col"
          defaultSize={65}
          minSize={50}
        >
          <Tabs
            className="h-full gap-y-0"
            defaultValue="preview"
            onValueChange={(value) => setTabState(value as 'code' | 'preview')}
            value={tabState}
          >
            <div className="flex w-full items-center gap-x-2 border-b p-2">
              <TabsList className="h-8 rounded-md border p-0">
                <TabsTrigger className="rounded-md" value="preview">
                  <EyeIcon /> <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger className="rounded-md" value="code">
                  <CodeIcon /> <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                <Button asChild size="sm" variant="default">
                  <Link href="/pricing">
                    <CrownIcon /> Upgrade
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="preview">
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>
            <TabsContent className="min-h-0" value="code">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment.files as { [path: string]: string }}
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
