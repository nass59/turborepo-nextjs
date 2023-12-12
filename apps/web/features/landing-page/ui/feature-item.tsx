type Props = {
  logo: React.ReactNode
  title: string
  description: string
}

export const FeatureItem = ({ logo, title, description }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-2xl">
      <div className="flex h-[180px] flex-col justify-between rounded-md bg-slate-900 p-6 text-slate-200">
        {logo}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-100">{title}</h3>
          <p className="text-sm text-slate-100">{description}</p>
        </div>
      </div>
    </div>
  )
}
