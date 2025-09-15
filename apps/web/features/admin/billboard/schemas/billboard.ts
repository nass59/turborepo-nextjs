import { z } from 'zod';

const billboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const defaultData = {
  label: '',
  imageUrl: '',
};

export type BillboardFormData = z.infer<typeof billboardSchema>;
