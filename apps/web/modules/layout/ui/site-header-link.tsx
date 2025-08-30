import type { ComponentProps } from 'react';
import type { LinkItem } from '@/modules/layout/types';
import { SiteHeaderLinkIndicator } from '@/modules/layout/ui/site-header-link-indicator';

type Props = ComponentProps<'a'> & {
  item: LinkItem;
};

export const SiteHeaderLink = ({ item }: Props) => {
  const Icon = item.icon;

  return (
    <>
      <a
        aria-label={item.ariaLabel}
        className="focus-outline block h-full w-full p-4 text-muted-foreground transition-colors group-hover:text-foreground"
        data-a11y="external-link-anchor"
        data-link={item.href}
        href={item.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon aria-hidden="true" className="inline size-5" />
      </a>
      <SiteHeaderLinkIndicator />
    </>
  );
};
