import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@workspace/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@workspace/design-system/components/ui/dropdown-menu';
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useTRPC } from '@/trpc/client';

type Props = {
  projectId: string;
};

export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();

  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  const { setTheme, theme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="pl-2! transition-opacity hover:bg-transparent hover:opacity-75 focus-visible:ring-0"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Image alt="Vibe" height={18} src="/logo2.svg" width={18} />
            <span className="font-medium text-sm">{project.name}</span>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="bottom">
          <DropdownMenuItem asChild>
            <Link href="/">
              <ChevronLeftIcon />
              <span>Go to Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <SunMoonIcon className="size-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
                  <DropdownMenuRadioItem value="light">
                    <span>Light</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <span>Dark</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <span>System</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
