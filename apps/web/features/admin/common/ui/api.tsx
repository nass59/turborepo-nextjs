import { CodeIcon } from "@radix-ui/react-icons";

import { Badge, type BadgeProps } from "@workspace/ui";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/ui/alert";

import { env } from "@/env.mjs";

import { CopyButton } from "./copy-button";

type Props = {
  title: string;
  path: string;
  variant: "public" | "admin";
};

const textMap: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const Api = ({ title, path, variant }: Props) => {
  const url = `${env.NEXT_PUBLIC_APP_URL}${path}`;

  return (
    <Alert className="flex flex-col gap-1">
      <CodeIcon className="size-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <code className="bg-muted relative rounded-md px-2 py-1 font-mono text-sm font-semibold">
          {url}
        </code>
        <CopyButton
          description={url}
          message="API route copied to the clipboard"
        />
      </AlertDescription>
    </Alert>
  );
};
