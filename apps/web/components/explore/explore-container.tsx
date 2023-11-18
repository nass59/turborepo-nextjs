import { type FC, type ReactNode } from "react"

interface ExploreContainerProps {
  children: ReactNode
}

const ExploreContainer: FC<ExploreContainerProps> = ({ children }) => {
  return (
    <section className="space-y-2 py-10 pb-8 md:pb-12">
      <div className="container flex flex-col gap-4">{children}</div>
    </section>
  )
}

export default ExploreContainer
