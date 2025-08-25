import { z } from 'zod';

const MAX_NAME_LENGTH = 32;
const MIN_NAME_LENGTH = 3;

export const userNameSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
});
