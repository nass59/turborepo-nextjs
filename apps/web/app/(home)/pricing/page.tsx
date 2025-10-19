'use client';

import { PricingTable } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import { useCurrentTheme } from '@/hooks/use-current-theme';

export default function Page() {
  const currentTheme = useCurrentTheme();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <Image
            alt="Vibe"
            className="hidden md:block"
            height={50}
            src="/logo.svg"
            width={50}
          />
        </div>
        <h1 className="text-center font-bold text-xl md:text-3xl">Pricing</h1>
        <p className="text-center text-muted-foreground text-sm md:text-base">
          Choose the plan that best fits your needs.
        </p>
        <PricingTable
          appearance={{
            baseTheme: currentTheme === 'dark' ? dark : undefined,
            elements: {
              cardBox: 'border! shadow-none! rounded-lg!',
            },
          }}
        />
      </section>
    </div>
  );
}
