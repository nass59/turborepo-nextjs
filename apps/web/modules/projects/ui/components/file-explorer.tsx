'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/design-system/components/ui/resizable';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Hint } from '@/components/hint';
import { convertFilesToTreeItems } from '@/lib/utils';
import { COPIED_TIMEOUT } from '../../constants';
import { getLanguageFromExtension } from '../../utils/lang';
import { CodeView } from './code-view';
import { FileBreadcrumb } from './file-breadcrumb';
import { TreeView } from './tree-view';

type FileCollection = {
  [path: string]: string;
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
