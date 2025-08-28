import { Separator } from '@workspace/design-system/components/ui/separator';
import { Block } from '@/app/modules/home/ui/home-block';
import { BlockSeparator } from '@/app/modules/home/ui/home-block-separator';
import { Heading } from '@/app/modules/home/ui/home-heading';
import { StackButtons } from '@/app/modules/home/ui/home-stack-buttons';

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#030303]">
      <div className="items-start md:grid md:grid-cols-2">
        {/* Left side */}
        <Block>
          <div className="mx-auto flex h-full max-w-2xl flex-col gap-2 md:justify-center">
            <Heading />
            <Separator className="mt-5 h-px text-gray-300" />
            <StackButtons />
          </div>
          <BlockSeparator />
        </Block>

        {/* Right side */}
        <Block>
          <div className="mx-auto flex h-full max-w-2xl flex-col gap-2 md:justify-center">
            <h3 className="bg-clip-text font-bold text-slate-200 text-xl tracking-tighter">
              In construction
            </h3>
          </div>
        </Block>
      </div>
    </div>
  );
}
