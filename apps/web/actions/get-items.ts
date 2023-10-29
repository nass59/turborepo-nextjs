import qs from "query-string"

import { env } from "@/env.mjs"
import { type Item } from "@/config/product"

const URL = `${env.NEXT_PUBLIC_API_URL}/items`

interface Query {
  categoryId?: string
  isFeatured?: boolean
}

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url)
  const data = await res.json()

  return data as T
}

const getItems = (query: Query) => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  })

  return fetchData<Item[]>(url)
}

export default getItems
