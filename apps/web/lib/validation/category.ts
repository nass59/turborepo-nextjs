import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})
