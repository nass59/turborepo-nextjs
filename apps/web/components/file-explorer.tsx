'use client';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@workspace/design-system/components/ui/breadcrumb';
import { Button } from '@workspace/design-system/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/design-system/components/ui/resizable';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { CodeView } from '@/components/code-view';
import { Hint } from '@/components/hint';
import { TreeView } from '@/components/tree-view';
import { convertFilesToTreeItems } from '@/lib/utils';

const COPIED_TIMEOUT = 2000; // 2 seconds

type FileCollection = {
  [path: string]: string;
};

const getLanguageFromExtension = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension || 'text';
};

type FileBreadcrumbProps = {
  filePath: string;
};

const FileBreadcrumb = ({ filePath }: FileBreadcrumbProps) => {
  const pathSegments = filePath.split('/');
  const maxSegments = 4; // Maximum number of segments to display

  const renderBreadcrumbItems = () => {
    if (pathSegments.length <= maxSegments) {
      // Show all segments if within limit
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        return (
          <Fragment key={segment}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      });
    }

    const firstSegment = pathSegments[0];
    const lastSegment = pathSegments.at(-1);

    return (
      <BreadcrumbItem>
        <span className="text-muted-foreground">{firstSegment}</span>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium">{lastSegment}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbItem>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

type FileExplorerProps = {
  files: FileCollection;
};

export const FileExplorer = ({ files }: FileExplorerProps) => {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null | undefined>(
    () => {
      const fileKeys = Object.keys(files);
      return fileKeys.length > 0 ? fileKeys[0] : null;
    }
  );

  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);

  const handleFileSelect = useCallback(
    (filePath: string) => {
      if (files[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [files]
  );

  const handleCopy = useCallback(() => {
    if (selectedFile && files[selectedFile]) {
      navigator.clipboard.writeText(files[selectedFile]);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_TIMEOUT);
    }
  }, [selectedFile, files]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="bg-sidebar" defaultSize={30} minSize={30}>
        <TreeView
          data={treeData}
          onSelect={handleFileSelect}
          value={selectedFile}
        />
      </ResizablePanel>
      <ResizableHandle className="transition-colors hover:bg-primary" />
      <ResizablePanel defaultSize={70} minSize={50}>
        {selectedFile && files[selectedFile] ? (
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between gap-x-2 border-b bg-sidebar px-4 py-2">
              <FileBreadcrumb filePath={selectedFile} />
              <Hint side="bottom" text="Copy to clipboard">
                <Button
                  className="ml-auto"
                  disabled={copied}
                  onClick={handleCopy}
                  size="icon"
                  variant="outline"
                >
                  {copied ? <CopyCheckIcon /> : <CopyIcon />}
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeView
                code={files[selectedFile]}
                lang={getLanguageFromExtension(selectedFile)}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p className="text-muted-foreground">No file selected</p>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
