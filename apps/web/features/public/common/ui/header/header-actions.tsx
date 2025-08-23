import {
  Button,
  buttonVariants,
} from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

export const HeaderActions = () => {
  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-2">
        {/* Dashboard */}
        <Link className={cn(buttonVariants({}))} href="/dashboard">
          Go to Dashboard
        </Link>

        {/* Github */}
        <Link
          className="rounded-full focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
          href={siteConfig.links.github}
          rel="noreferrer"
          target="_blank"
        >
          <Button size="icon" tabIndex={-1} variant="outline">
            <GithubIcon className="size-4" />
            <span className="sr-only">Github</span>
          </Button>
        </Link>
      </nav>
    </div>
  );
};
