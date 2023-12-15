import { env } from "@/env.mjs"

export const getOgUrl = (
  heading: string,
  type: string,
  mode: string = "dark"
): URL => {
  const ogUrl = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/og`)
  ogUrl.searchParams.set("heading", heading)
  ogUrl.searchParams.set("type", type)
  ogUrl.searchParams.set("mode", mode)

  return ogUrl
}
