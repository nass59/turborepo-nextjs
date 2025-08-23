import { cn } from '@workspace/design-system/lib/utils';

import type { TableOfContents } from '../utilities/toc';

type Props = {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
};

const MAX_LEVEL = 3;

export const Tree = ({ tree, level = 1, activeItem }: Props) => {
  if (!tree?.items?.length || level >= MAX_LEVEL) {
    return null;
  }

  return (
    <ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
      {tree.items.map((item) => (
        <li className="pt-2" key={item.url}>
          <a
            className={cn(
              'inline-block no-underline',
              item.url === `#${activeItem}`
                ? 'font-bold text-primary'
                : 'text-muted-foreground text-sm hover:text-primary'
            )}
            href={item.url}
          >
            {item.title}
          </a>
          {item.items?.length ? (
            <Tree activeItem={activeItem} level={level + 1} tree={item} />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
