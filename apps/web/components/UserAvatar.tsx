import { User } from "next-auth";
import { Avatar } from "@components/Avatar";

interface UserAvatarProps extends React.HTMLAttributes<HTMLElement> {
  user: Pick<User, "name" | "image">;
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image && <Avatar.Image src={user.image} alt="Picture" />}
      <Avatar.Fallback>
        <span className="sr-only">{user.name}</span>
      </Avatar.Fallback>
    </Avatar>
  );
};
