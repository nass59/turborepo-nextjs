import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

export const defaultData = {
  name: '',
  billboardId: '',
};

export type CategoryFormData = z.infer<typeof categorySchema>;
