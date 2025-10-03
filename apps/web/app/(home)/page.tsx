import { AnimatedGridPattern } from '@workspace/design-system/components/magicui/animated-grid-pattern';
import { cn } from '@workspace/design-system/lib/utils';
import Image from 'next/image';
import { ProjectForm } from '@/modules/home/ui/components/project-form';
import { ProjectsList } from '@/modules/home/ui/components/projects-list';

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col">
      <section className="space-y-6 pt-[10vh] pb-[6vh] md:pt-[16vh] md:pb-[10vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image alt="Vibe" height={50} src="/logo.svg" width={50} />
        </div>
        <h1 className="text-center font-bold text-2xl md:text-5xl">
          Build something amazing with TechShip AI
        </h1>
        <p className="text-center text-lg text-muted-foreground md:text-xl">
          Create apps and websites by chatting with AI
        </p>
        <div className="mx-auto w-full max-w-3xl">
          <ProjectForm />
        </div>
      </section>
      <ProjectsList />
      <AnimatedGridPattern
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,orange,transparent)]',
          'fixed inset-x-0 inset-y-0 h-[200%] skew-y-12'
        )}
        duration={3}
        maxOpacity={0.1}
        repeatDelay={1}
      />
    </div>
  );
}
