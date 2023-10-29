import { env } from "@/env.mjs"
import { type Billboard } from "@/config/product"

const URL = `${env.NEXT_PUBLIC_API_URL}/billboards`

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url)
  const data = await res.json()

  return data as T
}

const getBillboard = (id: string) => fetchData<Billboard>(`${URL}/${id}`)

export default getBillboard
