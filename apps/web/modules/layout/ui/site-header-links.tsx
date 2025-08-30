import { GithubIcon } from 'lucide-react';
import type { LinkItem } from '@/modules/layout/types';
import { SiteHeaderLink } from '@/modules/layout/ui/site-header-link';

const DATA: LinkItem[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/nass59/turborepo-nextjs',
    icon: GithubIcon,
    ariaLabel: 'GitHub repository (opens in a new tab)',
  },
];

/**
 * SiteHeaderLinks renders external resource links (icon-only) with accessible labels.
 */
export const SiteHeaderLinks = () => (
  <ul
    aria-label="External links"
    className="flex w-max shrink-0 items-center divide-x"
    data-a11y="external-links"
  >
    {DATA.map((item) => (
      <li
        className="group relative"
        data-a11y="external-link-item"
        data-link-label={item.label}
        key={item.href}
      >
        <SiteHeaderLink item={item} />
      </li>
    ))}
  </ul>
);
