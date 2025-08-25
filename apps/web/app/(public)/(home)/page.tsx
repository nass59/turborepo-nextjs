import { buttonVariants } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';

import { siteConfig } from '@/config/site';
import { Space3 } from '@/features/public/landing-page/assets/icons/space3';
import { Auth } from '@/features/public/landing-page/assets/logos/auth';
import { Github } from '@/features/public/landing-page/assets/logos/github';
import { MongoDB } from '@/features/public/landing-page/assets/logos/mongodb';
import { NextJS } from '@/features/public/landing-page/assets/logos/nextjs';
import { ReactJS } from '@/features/public/landing-page/assets/logos/reactjs';
import { Storybook } from '@/features/public/landing-page/assets/logos/storybook';
import { TailwindCSS } from '@/features/public/landing-page/assets/logos/tailwindcss';
import { FeatureItem } from '@/features/public/landing-page/ui/feature-item';
import { getGithubStars } from '@/features/public/landing-page/utilities/github/stars';

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Page() {
  const stars = await getGithubStars();

  return (
    <>
      <section className="space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-20">
        <div className="container mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
            Hello World !
          </h1>

          <Space3 />

          <p className="max-w-2xl text-muted-foreground leading-normal sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 14 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section
        className="space-y-12 bg-slate-50 px-5 py-8 md:py-12 lg:py-24 dark:bg-transparent"
        id="features"
      >
        <div className="container mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] text-muted-foreground leading-normal sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, API routes, and static pages would work in Next.js 14 app
            dir.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[58rem] md:grid-cols-3">
          <FeatureItem
            description="App dir, Routing, Layouts UI and API Routes."
            logo={<NextJS />}
            title="Next.js 14"
          />
          <FeatureItem
            description="Server and Client Components. Use hooks."
            logo={<ReactJS />}
            title="React 18"
          />
          <FeatureItem
            description="MongoDB and deployed on Atlas Cluster"
            logo={<MongoDB />}
            title="Database"
          />
          <FeatureItem
            description="Authentication using Clerk and middlewares."
            logo={<Auth />}
            title="Authentication"
          />
          <FeatureItem
            description="UI components built using Radix UI and styled with Tailwind
            CSS."
            logo={<TailwindCSS />}
            title="Components"
          />
          <FeatureItem
            description="Components Library with Storybook."
            logo={<Storybook />}
            title="Storybook"
          />
        </div>
      </section>

      <hr className="border-slate-200" />

      <section className="py-8 md:py-12 lg:py-24" id="open-source">
        <div className="container mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>

          <p className="mb-6 max-w-[85%] text-muted-foreground leading-normal sm:text-lg sm:leading-7">
            This project is open source and powered by open source software. The
            code is available on GitHub.
          </p>

          <div className="flex">
            <a
              className={cn(buttonVariants({ size: 'lg' }))}
              href={siteConfig.links.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github />
              Github
            </a>
            {stars && (
              <div className="flex items-center">
                <div className="h-4 w-3 border-y-8 border-y-transparent border-r-8 border-r-slate-800 border-l-0 border-solid" />
                <div className="flex h-10 items-center rounded-md border border-slate-800 bg-slate-800 px-4 font-medium text-white">
                  {stars} stars
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
