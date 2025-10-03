import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <SignUp />
        </div>
      </section>
    </div>
  );
}
