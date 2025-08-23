import type { ComponentProps } from 'react';

export const Container = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="relative flex flex-col space-y-8 p-8 pt-5 md:pt-3 md:pl-64">
      {children}
    </div>
  );
};
