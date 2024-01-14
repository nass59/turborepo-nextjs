import { Heading, HeadingAction } from "@shared/ui"

import { DeleteContentModal } from "./delete-content-modal"

type EditableProps = {
  title: string
  description: string
}

type Props = {
  labels: {
    resource: string
    create: EditableProps
    edit: EditableProps
  }
  isEdit?: boolean
}

export const FormContentHeading = ({ labels, isEdit = false }: Props) => {
  const contentLabels = isEdit ? labels.edit : labels.create

  return (
    <Heading
      title={contentLabels.title}
      description={contentLabels.description}
    >
      {isEdit && (
        <HeadingAction>
          <DeleteContentModal resource={labels.resource} />
        </HeadingAction>
      )}
    </Heading>
  )
}
