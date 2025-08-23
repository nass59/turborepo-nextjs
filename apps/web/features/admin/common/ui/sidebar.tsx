import { RocketIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { SpaceSwitcher } from "@/features/admin/space/ui/space-switcher";
import { getAllSpaces } from "@/features/admin/space/utilities/space";
import { parseData } from "@/lib/utils";

import { getCurrentUserId } from "../utilities/user";
import { MainNav } from "./main-nav";

export const Sidebar = async () => {
  const userId = await getCurrentUserId();
  const spaces = await getAllSpaces(userId);

  return (
    <div className="bg-background flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="text-md flex gap-2 px-8 py-5 font-semibold">
        <RocketIcon className="size-6" />
        <span className="font-bold">{siteConfig.name}</span>
      </div>

      <div className="mb-4 flex flex-col items-center justify-center gap-1 bg-slate-500/20 py-4">
        <SpaceSwitcher items={parseData(spaces)} />
      </div>

      <MainNav />
    </div>
  );
};
