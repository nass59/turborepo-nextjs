import type { ReactNode, SVGProps } from 'react';

export type LinkItem = {
  label: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  ariaLabel: string;
};
