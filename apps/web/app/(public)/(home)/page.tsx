import { Button } from '@workspace/design-system/components/ui/button';

import { DotIcon } from 'lucide-react';

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#030303]">
      <div className="items-start md:grid md:grid-cols-2">
        <div className="relative block bg-gradient-to-br from-transparent via-purple-900/5 to-orange-950/20 px-12 py-24 md:h-dvh">
          <div className="mx-auto flex h-full max-w-2xl flex-col gap-2 md:justify-center">
            <h1 className="bg-clip-text font-bold text-4xl text-slate-200 tracking-tighter sm:text-3xl md:text-6xl lg:text-8xl">
              Tech Blog
            </h1>
            <p className="bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-2xl text-transparent leading-10 tracking-tighter sm:text-xl">
              Latest updates, articles, and insights about NextJS, React,
              Typescript, and more.
            </p>
            <hr className="mt-5 h-px bg-gray-300" />
            <div className="mt-3 flex flex-wrap gap-4 text-gray-600">
              <Button
                className="gap-0 rounded-2xl border border-indigo-950 bg-[#0d0d0d] px-6 font-semibold text-sm tracking-tighter"
                variant="secondary"
              >
                <DotIcon className="inline size-8 animate-pulse text-[#d2d2d2]" />
                NextJS{' '}
                <span className="ml-2 font-bold text-[#d2d2d2] text-xs">
                  v15.5.2
                </span>
              </Button>
              <Button
                className="gap-0 rounded-2xl border border-indigo-950 bg-[#0d0d0d] px-6 font-semibold text-sm tracking-tighter"
                variant="secondary"
              >
                <DotIcon className="inline size-8 animate-pulse text-[#6bd6ef]" />
                React{' '}
                <span className="ml-2 font-bold text-[#6bd6ef] text-xs">
                  v19.1.1
                </span>
              </Button>
              <Button
                className="gap-0 rounded-2xl border border-indigo-950 bg-[#0d0d0d] font-semibold text-sm tracking-tighter"
                variant="secondary"
              >
                <DotIcon className="inline size-8 animate-pulse text-[#5aa6f7]" />
                Typescript{' '}
                <span className="ml-2 font-bold text-[#5aa6f7] text-xs">
                  v5.9.2
                </span>
              </Button>
            </div>
          </div>
          <div className="absolute inset-x-0 right-0 bottom-0 h-px bg-slate-100/100 mix-blend-overlay lg:top-0 lg:left-auto lg:h-auto lg:w-px" />
        </div>
        <div className="relative block bg-gradient-to-br from-transparent via-purple-900/5 to-orange-950/20 px-12 py-24 md:h-dvh">
          <div className="mx-auto flex h-full max-w-2xl flex-col gap-2 md:justify-center">
            <h3 className="bg-clip-text font-bold text-slate-200 text-xl tracking-tighter">
              In construction
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
