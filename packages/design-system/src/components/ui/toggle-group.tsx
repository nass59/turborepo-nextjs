'use client';

import { Item, Root } from '@radix-ui/react-toggle-group';
import { toggleVariants } from '@workspace/design-system/components/ui/toggle';
import { cn } from '@workspace/design-system/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof Root> & VariantProps<typeof toggleVariants>) {
  return (
    <Root
      className={cn(
        'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs',
        className
      )}
      data-size={size}
      data-slot="toggle-group"
      data-variant={variant}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Item> & VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
        className
      )}
      data-size={context.size || size}
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      {...props}
    >
      {children}
    </Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
