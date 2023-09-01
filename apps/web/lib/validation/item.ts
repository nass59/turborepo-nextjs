import { z } from "zod"

export const itemSchema = z.object({
  name: z.string().min(1),
  images: z.array(z.string()),
  categoryId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})
