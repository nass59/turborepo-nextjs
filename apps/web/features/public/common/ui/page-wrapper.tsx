import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const PageWrapper = ({ children }: Props) => {
  return <main className="flex-1">{children}</main>;
};
