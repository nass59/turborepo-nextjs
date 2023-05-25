import Link from "next/link"

import { siteConfig } from "@config/site"
import { cn } from "@lib/utils"
import { Space3 } from "@components/icons/space3"
import { Auth } from "@components/logos/auth"
import { Github } from "@components/logos/github"
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
          revalidate: 3600,
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
              className={cn(buttonVariants({ variant: "black", size: "lg" }))}
            >
              <Github />
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
