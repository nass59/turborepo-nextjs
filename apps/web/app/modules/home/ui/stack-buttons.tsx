import { ShimmerButton } from '@workspace/design-system/components/magicui/shimmer-button';

import { DotIcon } from 'lucide-react';

const STACKS = [
  { name: 'NextJS', version: 'v15.5.2', color: '#d2d2d2' },
  { name: 'React', version: 'v19.1.1', color: '#6bd6ef' },
  { name: 'Typescript', version: 'v5.9.2', color: '#5aa6f7' },
] as const;

export const StackButtons = () => (
  <div className="mt-3 flex flex-wrap gap-4 text-gray-600">
    {STACKS.map((stack) => (
      <ShimmerButton
        className="px-3 py-1"
        key={stack.name}
        shimmerColor={stack.color}
        shimmerDuration="3.2s"
      >
        <DotIcon
          className="inline size-8 animate-pulse"
          style={{ color: stack.color }}
        />
        <span className="font-semibold text-slate-50 text-sm tracking-tighter">
          {stack.name}
        </span>
        <span className="ml-2 font-bold text-xs" style={{ color: stack.color }}>
          {stack.version}
        </span>
      </ShimmerButton>
    ))}
  </div>
);
