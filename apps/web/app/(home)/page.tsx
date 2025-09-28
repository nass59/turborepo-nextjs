import Image from 'next/image';
import { ProjectForm } from '@/modules/home/ui/components/project-form';

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            alt="Vibe"
            className="hidden md:block"
            height={50}
            src="/logo2.svg"
            width={50}
          />
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
    </div>
  );
}
