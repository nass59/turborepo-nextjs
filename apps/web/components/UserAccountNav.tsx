"use client";

import { siteConfig } from "@config/site";
import { User } from "next-auth";
import Link from "next/link";
import { DropdownMenu } from "@components/DropdownMenu";
import { signOut } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLElement> {
  user: Pick<User, "name" | "email" | "image">;
}

export const UserAccountNav = ({ user }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="flex items-center gap-2 rounded-full  overflow-hidden focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus-visible:outline-none">
        <UserAvatar user={{ name: user.name, image: user.image }} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-5 md:w-[240px]" align="end">
          <div className="flex items-center justify-start gap-2 p-4">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-slate-600">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link href="/dashboard" className="w-full">
              Dashboard
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard" className="w-full">
              Settings
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link href="/docs" target="_blank" className="w-full">
              Documentation
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link
              href={siteConfig.links.github}
              className="w-full"
              target="_blank"
            >
              GitHub
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            className="cursor-pointer text-red-400 focus:text-red-500"
            onSelect={(event) => {
              event.preventDefault();
              signOut({ callbackUrl: `${window.location.origin}/login` });
            }}
          >
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
};
