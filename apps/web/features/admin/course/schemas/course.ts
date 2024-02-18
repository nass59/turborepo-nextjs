import { z } from "zod"

export const courseSchema = z.object({
  title: z.string().min(3),
  imageUrl: z.string().min(1),
})

export const defaultData = {
  title: "",
  imageUrl: "",
}

export type CourseFormData = z.infer<typeof courseSchema>
