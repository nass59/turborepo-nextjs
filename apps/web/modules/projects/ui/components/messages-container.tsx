import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import type { Fragment } from '@/generated/prisma';
import { useTRPC } from '@/trpc/client';
import { MessageCard } from './message-card';
import { MessageForm } from './message-form';
import { MessageLoading } from './message-loading';

type Props = {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
};

export const MessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );

  useEffect(() => {
    const lastAssistantMessageWithFragment = messages
      .slice()
      .reverse()
      .find((message) => message.role === 'ASSISTANT' && !!message.fragment);

    if (lastAssistantMessageWithFragment) {
      setActiveFragment(lastAssistantMessageWithFragment.fragment);
    }
  }, [messages, setActiveFragment]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ui
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const lastMessage = messages.at(-1);
  const isLastMessageFromUser = lastMessage?.role === 'USER';

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages?.map((message) => (
            <MessageCard
              content={message.content}
              createdAt={message.createdAt}
              fragment={message.fragment}
              isActiveFragment={activeFragment?.id === message.fragment?.id}
              key={message.id}
              onFragmentClick={() => setActiveFragment(message.fragment)}
              role={message.role}
              type={message.type}
            />
          ))}
        </div>
        {isLastMessageFromUser && <MessageLoading />}
        <div ref={bottomRef} />
      </div>
      <div className="relative p-3 pt-1">
        <div className="-top-6 pointer-events-none absolute right-0 left-0 h-6 bg-gradient-to-b from-transparent to-background/70" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};
