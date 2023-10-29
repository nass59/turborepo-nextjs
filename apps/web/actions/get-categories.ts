import { env } from "@/env.mjs"
import { type Category } from "@/config/product"

const URL = `${env.NEXT_PUBLIC_API_URL}/categories`

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url)
  const data = await res.json()

  return data as T
}

const getCategories = () => fetchData<Category[]>(URL)

export default getCategories
