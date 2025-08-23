'use client';

import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export const BreadcrumbItems = () => {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  const segments = pathname.split('/').slice(2);

  return (
    <div className="flex space-x-2">
      {segments.map((segment) => (
        <Fragment key={segment}>
          <span className="rounded-full text-slate-900" key={segment}>
            {segment}
          </span>
          <span className="text-slate-600">/</span>
        </Fragment>
      ))}
    </div>
  );
};
