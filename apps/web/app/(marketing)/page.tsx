import Link from "next/link";
import { siteConfig } from "@config/site";
import { Space3 } from "@components/icons/space3";

export default function Page() {
  return (
    <>
      <section className="container grid items-center justify-center gap-6 pt-3 pb-8 md:pb-12 lg:pb-24">
        <div className="mx-auto flex flex-col items-center gap-4 lg:w-[52rem]">
          <h1 className="text-3xl font-bold items-start leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl text-slate-800 pt-10">
            Hello World !
          </h1>

          <Space3 />

          <p className="max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section className="container grid justify-center gap-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex flex-col gap-4 md:max-w-[43rem]">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-6xl text-slate-800">
            Tech
          </h2>
          <p className="leading-normal text-slate-700 sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p>
          <div className="flex gap-4">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center h-11 border border-transparent rounded-md border-slate-200 bg-slate-800 px-8 py-2 text-white font-medium hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            >
              Github
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
