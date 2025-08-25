import { cn } from '@workspace/design-system/lib/utils';

import type { ItemModel } from '@/lib/database/models/item';

import { NoResults } from './no-results';
import { PosterCard } from './poster-card';

type Props = {
  title: string;
  items: ItemModel[];
  nbCols?: 4 | 5;
};

const NB_COLS_MOBILE = 4;
const NB_COLS_DESKTOP = 5;

const Items = ({ items, nbCols }: Pick<Props, 'items' | 'nbCols'>) => {
  if (items.length === 0) {
    return <NoResults />;
  }

  return (
    <div
      className={cn('grid gap-2', {
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4':
          nbCols === NB_COLS_MOBILE,
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5':
          nbCols === NB_COLS_DESKTOP,
      })}
    >
      {items.map((item) => (
        <PosterCard data={item} key={item._id.toString()} />
      ))}
    </div>
  );
};

export const List = ({ title, items, nbCols = 4 }: Props) => {
  return (
    <div className="space-y-8">
      <h3 className="font-bold text-4xl">{title}</h3>
      <Items items={items} nbCols={nbCols} />
    </div>
  );
};
