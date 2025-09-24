import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { MessageCard } from '@/modules/projects/ui/components/message-card';
import { MessageForm } from '@/modules/projects/ui/components/message-form';
import { useTRPC } from '@/trpc/client';

type Props = {
  projectId: string;
};

export const MessagesContainer = ({ projectId }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );

  useEffect(() => {
    const lastAssistantMessage = messages
      .slice()
      .reverse()
      .find((m) => m.role === 'ASSISTANT');

    if (lastAssistantMessage) {
      // TODO: highlight the fragment in the code viewer
    }
  }, [messages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ui
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

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
        <div ref={bottomRef} />
      </div>
      <div className="relative p-3 pt-1">
        <div className="-top-6 pointer-events-none absolute right-0 left-0 h-6 bg-gradient-to-b from-transparent to-background/70" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};
