import { useSuspenseQuery } from '@tanstack/react-query';
import { MessageCard } from '@/modules/projects/ui/components/message-card';
import { useTRPC } from '@/trpc/client';

type Props = {
  projectId: string;
};

export const MessagesContainer = ({ projectId }: Props) => {
  const trpc = useTRPC();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages?.map((message) => (
            <MessageCard
              content={message.content}
              createdAt={message.createdAt}
              fragment={message.fragment}
              isActiveFragment={false}
              key={message.id}
              onFragmentClick={() => null}
              role={message.role}
              type={message.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
