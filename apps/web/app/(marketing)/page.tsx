import Link from "next/link"

import { siteConfig } from "@config/site"
import { cn } from "@lib/utils"
import { Space3 } from "@components/icons/space3"
import { Auth } from "@components/logos/auth"
import { MongoDB } from "@components/logos/mongodb"
import { NextJS } from "@components/logos/nextjs"
import { ReactJS } from "@components/logos/reactjs"
import { Storybook } from "@components/logos/storybook"
import { TailwindCSS } from "@components/logos/tailwindcss"
import { buttonVariants } from "@components/ui/button"
import { FeatureItem } from "@components/ui/feature-item"

async function getGithubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/nass59/turborepo-nextjs",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function Page() {
  const stars = await getGithubStars()

  return (
    <>
      <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pb-24 lg:pt-16">
        <div className="mx-auto flex flex-col items-center gap-4 lg:w-[52rem]">
          <h1 className="items-start pt-10 text-3xl font-bold leading-[1.1] tracking-tighter text-slate-800 sm:text-5xl md:text-6xl">
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
        <div className="mx-auto flex flex-col gap-4 md:max-w-[56rem]">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter text-slate-800 sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="leading-normal text-slate-700 sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, API routes, and static pages would work in Next.js 13 app
            dir.
          </p>
        </div>

        <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[56rem] md:grid-cols-3">
          <FeatureItem
            logo={<NextJS />}
            title="Next.js 13"
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
            description="Authentication using NextAuth.js and middlewares."
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

      <section className="container grid justify-center gap-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex flex-col gap-4 md:max-w-[56rem]">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>

          <p className="max-w-[85%] leading-normal text-slate-700 sm:text-lg sm:leading-7">
            This project is open source and powered by open source software. The
            code is available on GitHub.
          </p>

          <div className="flex">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="mr-2 h-5 w-5 text-white"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              Github
            </Link>
            {stars && (
              <div className="flex items-center">
                <div className="h-4 w-3 border-y-8 border-l-0 border-r-8 border-solid border-y-transparent border-r-slate-800"></div>
                <div className="flex h-9 items-center rounded-md border border-slate-800 bg-slate-800 px-4 text-sm font-medium text-slate-100">
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
