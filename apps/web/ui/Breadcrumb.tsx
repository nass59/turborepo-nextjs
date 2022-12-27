"use client";

import React from "react";
import { Icons } from "@components/icons";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();

  return (
    <div className="flex h-9 items-center rounded-md bg-slate-50 px-5">
      <Icons.tree className="h-4 w-4" />
      <div className="flex space-x-1 text-sm font-medium">
        <div>
          <span className="px-2 text-slate-400 opacity-60">TechShip</span>
        </div>
        {pathname ? (
          <>
            <span className="text-slate-600">/</span>
            {pathname
              .split("/")
              .slice(2)
              .map((segment) => {
                return (
                  <React.Fragment key={segment}>
                    <span>
                      <span
                        key={segment}
                        className="rounded-full px-1.5 py-0.5 text-slate-900"
                      >
                        {segment}
                      </span>
                    </span>

                    <span className="text-slate-600">/</span>
                  </React.Fragment>
                );
              })}
          </>
        ) : null}
      </div>
    </div>
  );
}
