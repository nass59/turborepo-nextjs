type Props = {
  title: string
  description?: string
}

export const Heading = ({ title, description }: Props) => {
  return (
    <div className="space-y-4">
      <h1 className="inline-block font-heading text-4xl lg:text-5xl">
        {title}
      </h1>

      {description && (
        <p className="text-xl text-muted-foreground">{description}</p>
      )}
      <hr />
    </div>
  )
}
