import { z } from 'zod';

const MAX_NAME_LENGTH = 50;

export const settingSchema = z.object({
  name: z.string().min(1).max(MAX_NAME_LENGTH),
});
