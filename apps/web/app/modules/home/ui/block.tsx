import type { PropsWithChildren } from 'react';

export const Block = ({ children }: PropsWithChildren) => (
  <div className="relative block bg-gradient-to-br from-transparent via-purple-900/5 to-orange-950/20 px-12 py-24 md:h-dvh">
    {children}
  </div>
);
