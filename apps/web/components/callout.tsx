import { cn } from "@lib/utils"

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: "default" | "info" | "warning" | "danger"
}

export const Callout = ({
  children,
  icon,
  type = "default",
  ...props
}: CalloutProps) => {
  return (
    <div
      className={cn("my-6 flex items-start rounded-md border border-l-4 p-4", {
        "border-green-600 bg-slate-50": type === "default",
        "border-slate-600 bg-slate-50": type === "info",
        "border-red-900 bg-red-50": type === "danger",
        "border-yellow-900 bg-yellow-50": type === "warning",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}
