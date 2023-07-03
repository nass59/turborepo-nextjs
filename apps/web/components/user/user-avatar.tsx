import { type User } from "next-auth"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps,
} from "@shared/ui"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage src={user.image} alt="Picture" />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
