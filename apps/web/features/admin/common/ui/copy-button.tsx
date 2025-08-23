'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import { CopyIcon } from 'lucide-react';

import { onCopy } from '../utilities/copy';

type Props = {
  description: string;
  message: string;
};

export const CopyButton = ({ description, message }: Props) => {
  return (
    <Button
      onClick={() => onCopy(description, message)}
      size="icon"
      variant="outline"
    >
      <CopyIcon className="size-4" />
    </Button>
  );
};
