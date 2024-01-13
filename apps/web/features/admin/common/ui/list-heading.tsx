import { Heading, HeadingAction } from "@shared/ui"

import { AddButton } from "./add-button"

type Props = {
  labels: {
    title: string
    description: string
    add: string
  }
  value: number
  path: string
}

export const ListHeading = ({ labels, value, path }: Props) => {
  return (
    <Heading
      title={labels.title}
      suffixTitle={`(${value})`}
      description={labels.description}
    >
      <HeadingAction>
        <AddButton labels={labels} path={path} />
      </HeadingAction>
    </Heading>
  )
}
