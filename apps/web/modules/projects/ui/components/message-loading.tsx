import Image from 'next/image';
import { useEffect, useState } from 'react';

const INTERVAL_DURATION = 2000; // 2 seconds

const ShimmerMessages = () => {
  const messages = [
    'Thinking...',
    'Analyzing your project...',
    'Generating insights...',
    'Almost done...',
    'Finalizing...',
    'Just a moment more...',
    'Preparing your response...',
    'Loading data...',
    'Crunching numbers...',
    'Synthesizing information...',
    'Wrapping up...',
    'Finishing touches...',
    'Almost there...',
    'Just a few more seconds...',
    'Getting everything ready...',
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="animate-pulse text-base text-muted-foreground">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="group flex flex-col px-2 pb-4">
      <div className="mb-2 flex items-center gap-2 pl-2">
        <Image
          alt="Vibe"
          className="shrink-0"
          height={18}
          src="/logo.svg"
          width={18}
        />
        <span className="font-medium text-sm">Vibe</span>
      </div>
      <div className="flex flex-col gap-y-4 pl-8.5">
        <ShimmerMessages />
      </div>
    </div>
  );
};
