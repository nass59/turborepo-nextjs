import { Heading, HeadingAction } from '@/components/heading';

import { AddButton } from './add-button';

type Props = {
  labels: {
    title: string;
    description: string;
    add: string;
  };
  value: number;
  path: string;
};

export const ListHeading = ({ labels, value, path }: Props) => {
  return (
    <Heading
      description={labels.description}
      suffixTitle={`(${value})`}
      title={labels.title}
    >
      <HeadingAction>
        <AddButton labels={labels} path={path} />
      </HeadingAction>
    </Heading>
  );
};
