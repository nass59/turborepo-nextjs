import { AnimatedGridPattern } from '@workspace/design-system/components/magicui/animated-grid-pattern';
import { Separator } from '@workspace/design-system/components/ui/separator';
import { cn } from '@workspace/design-system/lib/utils';
import { HomeBlock } from '@/modules/home/ui/home-block';
import { HomeBlockSeparator } from '@/modules/home/ui/home-block-separator';
import { HomeHeading } from '@/modules/home/ui/home-heading';
import { HomeStackButtons } from '@/modules/home/ui/home-stack-buttons';

const ANIM_OPTIONS = {
  duration: 3,
  maxOpacity: 0.1,
  repeatDelay: 1,
};

export default function Page() {
  return (
    <section className="relative flex min-h-screen flex-col bg-[#030303]">
      <div className="items-start md:grid md:grid-cols-2">
        {/* Hero section */}
        <HomeBlock className="overflow-hidden">
          <div className="mx-auto flex h-full max-w-2xl flex-col gap-2 md:justify-center">
            <HomeHeading />
            <Separator className="mt-5 h-px text-gray-300" />
            <HomeStackButtons />
          </div>
          <HomeBlockSeparator />
          <AnimatedGridPattern
            className={cn(
              '[mask-image:radial-gradient(500px_circle_at_center,orange,transparent)]',
              'inset-x-0 inset-y-0 hidden h-[200%] skew-y-12 md:block'
            )}
            duration={ANIM_OPTIONS.duration}
            maxOpacity={ANIM_OPTIONS.maxOpacity}
            repeatDelay={ANIM_OPTIONS.repeatDelay}
          />
        </HomeBlock>

        {/* Secondary panel */}
        <HomeBlock aria-labelledby="secondary-panel-heading">
          <div className="mx-auto flex h-full max-w-2xl flex-col gap-2 md:justify-center">
            <h2
              className="bg-clip-text font-bold text-slate-200 text-xl tracking-tighter"
              id="secondary-panel-heading"
            >
              Upcoming content
            </h2>
          </div>
        </HomeBlock>
      </div>
    </section>
  );
}
