import { Card } from '@workspace/design-system/components/ui/card';
import { cn } from '@workspace/design-system/lib/utils';
import { format } from 'date-fns';
import { ChevronRightIcon, Code2Icon } from 'lucide-react';
import Image from 'next/image';
import type { Fragment, MessageRole, MessageType } from '@/generated/prisma';

type MessageCardProps = {
  content: string;
  createdAt: Date;
  fragment: Fragment | null;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  role: MessageRole;
  type: MessageType;
};

type UserMessageProps = {
  content: string;
};

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex justify-end pr-2 pb-4 pl-10">
      <Card className="max-w-[80%] break-words rounded-lg border-none bg-muted p-3 shadow-none">
        {content}
      </Card>
    </div>
  );
};

type FragmentCardProps = {
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
};

const FragmentCard = ({
  fragment,
  isActiveFragment,
  onFragmentClick,
}: FragmentCardProps) => {
  return (
    <button
      className={cn(
        'flex w-fit items-start gap-2 rounded-lg border bg-muted p-3 text-start transition-colors hover:bg-secondary',
        isActiveFragment &&
          'border-primary bg-primary text-primary-foreground hover:bg-primary'
      )}
      onClick={() => onFragmentClick(fragment)}
      type="button"
    >
      <Code2Icon className="mt-0.5 size-4" />
      <div className="flex flex-1 flex-col">
        <span className="line-clamp-1 font-medium text-sm">
          {fragment.title}
        </span>
        <span className="text-sm">Preview</span>
      </div>
      <div className="mt-0.5 flex items-center justify-center">
        <ChevronRightIcon className="size-4" />
      </div>
    </button>
  );
};

type AssistantMessageProps = Omit<MessageCardProps, 'role'>;

const AssistantMessage = ({
  content,
  createdAt,
  fragment,
  isActiveFragment,
  onFragmentClick,
  type,
}: AssistantMessageProps) => {
  return (
    <div
      className={cn(
        'group flex flex-col px-2 pb-4',
        type === 'ERROR' && 'text-red-700 dark:text-red-500'
      )}
    >
      <div className="mb-2 flex items-center gap-2 pl-2">
        <Image
          alt="Vibe"
          className="shrink-0"
          height={18}
          src="/logo2.svg"
          width={18}
        />
        <span className="font-medium text-sm">Vibe</span>
        <span className="text-muted-foreground text-xs opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>
      <div className="flex flex-col gap-y-4 pl-8.5">
        <span>{content}</span>
        {fragment && type === 'RESULT' && (
          <FragmentCard
            fragment={fragment}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
          />
        )}
      </div>
    </div>
  );
};

export const MessageCard = ({
  content,
  createdAt,
  fragment,
  isActiveFragment,
  onFragmentClick,
  role,
  type,
}: MessageCardProps) => {
  if (role === 'ASSISTANT') {
    return (
      <AssistantMessage
        content={content}
        createdAt={createdAt}
        fragment={fragment}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
      />
    );
  }

  return <UserMessage content={content} />;
};
