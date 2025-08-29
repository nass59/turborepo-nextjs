import { GithubIcon } from 'lucide-react';
import { HeaderLinkHover } from '@/modules/home/ui/header-link-hover';

const DATA = [
  {
    label: 'GitHub',
    href: 'https://github.com/nass59/turborepo-nextjs',
    icon: GithubIcon,
    ariaLabel: 'GitHub repository (opens in a new tab)',
  },
];

/**
 * HeaderLinks renders external resource links (icon-only) with accessible labels.
 */
export const HeaderLinks = () => (
  <ul
    aria-label="External links"
    className="flex w-max shrink-0 items-center divide-x"
    data-a11y="external-links"
  >
    {DATA.map((item) => {
      const Icon = item.icon;
      return (
        <li
          className="group relative"
          data-a11y="external-link-item"
          data-link-label={item.label}
          key={item.href}
        >
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
            <span className="sr-only">{item.ariaLabel}</span>
          </a>
          <HeaderLinkHover />
        </li>
      );
    })}
  </ul>
);
