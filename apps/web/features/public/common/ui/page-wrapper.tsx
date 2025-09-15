import type { PropsWithChildren } from 'react';

import { Footer } from './footer/footer';

type Props = PropsWithChildren;

export const PageWrapper = ({ children }: Props) => {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};
