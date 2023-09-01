import { z } from "zod"

export const settingSchema = z.object({
  name: z.string().min(1).max(50),
})
