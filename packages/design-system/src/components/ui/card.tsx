import { cn } from '@workspace/design-system/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

const cardVariants = cva(
  'relative flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'rounded-xl border py-6 shadow-sm',
        poster: 'aspect-poster rounded-sm bg-slate-800 p-0 text-slate-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type CardProps = React.ComponentProps<'div'> &
  VariantProps<typeof cardVariants>;

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, className }))}
      data-slot="card"
      {...props}
    />
  );
}

type CardHeaderProps = React.ComponentProps<'div'> & {
  isAbsolute?: boolean;
};

function CardHeader({
  className,
  isAbsolute = false,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        {
          'absolute top-0 left-0 z-[1] p-3': isAbsolute,
        },
        className
      )}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('font-semibold leading-none', className)}
      data-slot="card-title"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="card-description"
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      data-slot="card-action"
      {...props}
    />
  );
}

type CardContentProps = React.ComponentProps<'div'> & { isPoster?: boolean };

function CardContent({ className, isPoster, ...props }: CardContentProps) {
  return (
    <div
      className={cn(
        'relative px-6',
        {
          'aspect-poster': isPoster,
        },
        className
      )}
      data-slot="card-content"
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative flex items-center px-6 [.border-t]:pt-6',
        className
      )}
      data-slot="card-footer"
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
