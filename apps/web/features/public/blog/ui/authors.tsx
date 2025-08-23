import {
  Avatar,
  AvatarImage,
} from '@workspace/design-system/components/ui/avatar';
import Link from 'next/link';

export type Author = {
  name: string;
  twitter: string;
  avatar: string;
};

type Props = {
  authors: Author[];
};

export const Authors = ({ authors }: Props) => {
  if (!authors?.length) {
    return null;
  }

  return (
    <div className="flex space-x-4">
      {authors.map((author) =>
        author ? (
          <Link
            className="flex items-center space-x-2 text-sm"
            href={`https://twitter.com/${author.twitter}`}
            key={author.name}
          >
            <Avatar>
              <AvatarImage alt={author.name} src={author.avatar} />
            </Avatar>

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{author.name}</p>
              <p className="text-muted-foreground text-xs">@{author.twitter}</p>
            </div>
          </Link>
        ) : null
      )}
    </div>
  );
};
