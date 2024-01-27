import { type ComponentProps } from "react"

export const Container = ({ children }: ComponentProps<"div">) => {
  return (
    <div className="relative flex flex-col space-y-8 p-8 pl-64 pt-3">
      {children}
    </div>
  )
}
