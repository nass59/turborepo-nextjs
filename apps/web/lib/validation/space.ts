import { z } from "zod"

export const spaceSchema = z.object({
  name: z.string().min(1),
})
