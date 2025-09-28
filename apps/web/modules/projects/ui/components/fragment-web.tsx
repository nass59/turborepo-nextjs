'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import { ExternalLinkIcon, RefreshCcwIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Hint } from '@/components/hint';
import type { Fragment } from '@/generated/prisma';

type Props = {
  data: Fragment;
};

const COPIED_TIMEOUT = 2000; // 2 seconds

export const FragmentWeb = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);
  const [fragmentKey, setFragmentKey] = useState(0);

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_TIMEOUT);
  }, [data.sandboxUrl]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-x-2 border-b bg-sidebar p-2">
        <Hint align="start" side="bottom" text="Refresh">
          <Button onClick={onRefresh} size="sm" variant="outline">
            <RefreshCcwIcon />
          </Button>
        </Hint>
        <Hint align="start" side="bottom" text="Click to copy">
          <Button
            className="flex-1 justify-start text-start font-normal"
            disabled={!data.sandboxUrl || copied}
            onClick={handleCopy}
            size="sm"
            variant="outline"
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>
        <Hint align="start" side="bottom" text="Open in new tab">
          <Button
            disabled={!data.sandboxUrl}
            onClick={() => {
              if (!data.sandboxUrl) {
                return;
              }
              window.open(data.sandboxUrl, '_blank');
            }}
            size="sm"
            variant="outline"
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>
      <iframe
        className="h-full w-full"
        key={fragmentKey}
        loading="lazy"
        sandbox="allow-forms allow-scripts allow-same-origin"
        src={data.sandboxUrl}
        title="Fragment Web View"
      />
    </div>
  );
};
