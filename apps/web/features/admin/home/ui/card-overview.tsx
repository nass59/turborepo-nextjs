import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/design-system/components/ui/card';

type CardOverviewProps = {
  title: string;
  value?: number;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

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
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        {icon && icon}
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {children || <div className="font-bold text-2xl">{value}</div>}
      </CardContent>
    </Card>
  );
};
