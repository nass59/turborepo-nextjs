import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui"

type CardOverviewProps = {
  title: string
  value?: number
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export const CardOverview = ({
  title,
  value,
  icon,
  className,
  children,
}: CardOverviewProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && icon}
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {children || <div className="text-2xl font-bold">{value}</div>}
      </CardContent>
    </Card>
  )
}
