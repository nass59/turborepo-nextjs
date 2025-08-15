import Link from "next/link";
import { GithubIcon } from "lucide-react";

import {
  Button,
  buttonVariants,
} from "@workspace/design-system/components/ui/button";
import { cn } from "@workspace/design-system/lib/utils";

import { siteConfig } from "@/config/site";

export const HeaderActions = () => {
  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-2">
        {/* Dashboard */}
        <Link href="/dashboard" className={cn(buttonVariants({}))}>
          Go to Dashboard
        </Link>

        {/* Github */}
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
        >
          <Button variant="outline" size="icon" tabIndex={-1}>
            <GithubIcon className="size-4" />
            <span className="sr-only">Github</span>
          </Button>
        </Link>
      </nav>
    </div>
  );
};
