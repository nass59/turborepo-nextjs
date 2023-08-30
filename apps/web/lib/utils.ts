import { env } from "@/env.mjs"

export function formatDate(input: string | number): string {
  const date = new Date(input)

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function parseData<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T
}
