import { z } from 'zod';

const MIN_LENGTH_TITLE = 3;

export const courseSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE),
  imageUrl: z.string().min(1),
});

export const defaultData = {
  title: '',
  imageUrl: '',
};

export type CourseFormData = z.infer<typeof courseSchema>;
