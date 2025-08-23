import { Heading, HeadingAction } from '@/components/heading';

import { DeleteContentModal } from './delete-content-modal';

type EditableProps = {
  title: string;
  description: string;
};

type Props = {
  labels: {
    resource: string;
    create: EditableProps;
    edit: EditableProps;
  };
  isEdit?: boolean;
};

export const FormContentHeading = ({ labels, isEdit = false }: Props) => {
  const contentLabels = isEdit ? labels.edit : labels.create;

  return (
    <Heading
      description={contentLabels.description}
      title={contentLabels.title}
    >
      {isEdit && (
        <HeadingAction>
          <DeleteContentModal resource={labels.resource} />
        </HeadingAction>
      )}
    </Heading>
  );
};
