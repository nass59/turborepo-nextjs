import { cn } from "@lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "types";
import { Icons } from "./icons";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "post"];

        return (
          <Link
            key={index}
            href={item.disabled || !item.href ? "/" : item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2",
              path === item.href ? "bg-slate-200" : "bg-transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <Icon className="mr-2 w-4 h-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};
