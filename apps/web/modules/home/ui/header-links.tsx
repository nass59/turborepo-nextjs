import { GithubIcon } from 'lucide-react';
import { HeaderLinkHover } from '@/modules/home/ui/header-link-hover';

const DATA = [
  {
    label: 'GitHub',
    href: 'https://github.com/nass59/turborepo-nextjs',
    icon: GithubIcon,
  },
];

export const HeaderLinks = () => (
  <ul className="flex w-max shrink-0 items-center divide-x">
    {DATA.map((item) => {
      const Icon = item.icon;

      return (
        <li className="group relative" key={item.href}>
          <a
            className="block h-full w-full p-4 text-muted-foreground transition-colors group-hover:text-foreground"
            href={item.href}
            rel="noopener"
            target="_blank"
          >
            <Icon className="inline size-5" />
          </a>
          <HeaderLinkHover />
        </li>
      );
    })}
  </ul>
);
