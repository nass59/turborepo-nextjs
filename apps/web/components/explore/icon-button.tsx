import { type MouseEventHandler } from "react"

import { Button } from "@shared/ui"

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  icon: React.ReactElement
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className="rounded-full bg-white text-black transition hover:scale-110"
    >
      {icon}
    </Button>
  )
}

export default IconButton
