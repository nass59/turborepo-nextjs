import { Heading, HeadingAction } from "@shared/ui"

import { DeleteModal } from "../delete-modal"

type Props = {
  labels: {
    title: string
    desscription: string
  }
}

export const FormHeading = ({ labels }: Props) => {
  return (
    <Heading title={labels.title} description={labels.desscription}>
      <HeadingAction>
        <DeleteModal />
      </HeadingAction>
    </Heading>
  )
}
