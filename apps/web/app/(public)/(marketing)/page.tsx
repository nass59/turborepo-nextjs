import { siteConfig } from "@/config/site"
import { buttonVariants, cn } from "@shared/ui"
import { Space3 } from "@/features/public/landing-page/assets/icons/space3"
import {
  Auth,
  Github,
  MongoDB,
  NextJS,
  ReactJS,
  Storybook,
  TailwindCSS,
} from "@/features/public/landing-page/assets/logos"
import { FeatureItem } from "@/features/public/landing-page/ui/feature-item"
import { getGithubStars } from "@/features/public/landing-page/utilities/github/stars"

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Page() {
  const stars = await getGithubStars()

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
            Hello World !
          </h1>

          <Space3 />

          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 14 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section
        id="features"
        className="space-y-12 bg-slate-50 px-5 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="container mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, API routes, and static pages would work in Next.js 14 app
            dir.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[58rem] md:grid-cols-3">
          <FeatureItem
            logo={<NextJS />}
            title="Next.js 14"
            description="App dir, Routing, Layouts UI and API Routes."
          />
          <FeatureItem
            logo={<ReactJS />}
            title="React 18"
            description="Server and Client Components. Use hooks."
          />
          <FeatureItem
            logo={<MongoDB />}
            title="Database"
            description="MongoDB and deployed on Atlas Cluster"
          />
          <FeatureItem
            logo={<Auth />}
            title="Authentication"
            description="Authentication using Clerk and middlewares."
          />
          <FeatureItem
            logo={<TailwindCSS />}
            title="Components"
            description="UI components built using Radix UI and styled with Tailwind
            CSS."
          />
          <FeatureItem
            logo={<Storybook />}
            title="Storybook"
            description="Components Library with Storybook."
          />
        </div>
      </section>

      <hr className="border-slate-200" />

      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>

          <p className="mb-6 max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is open source and powered by open source software. The
            code is available on GitHub.
          </p>

          <div className="flex">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Github />
              Github
            </a>
            {stars && (
              <div className="flex items-center">
                <div className="h-4 w-3 border-y-8 border-l-0 border-r-8 border-solid border-y-transparent border-r-slate-800"></div>
                <div className="flex h-10 items-center rounded-md border border-slate-800 bg-slate-800 px-4 font-medium text-white">
                  {stars} stars
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
