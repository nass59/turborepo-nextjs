import { z } from 'zod';

const MAX_TITLE_LENGTH = 128;
const MIN_TITLE_LENGTH = 3;

export const postSchema = z.object({
  title: z.string().min(MIN_TITLE_LENGTH).max(MAX_TITLE_LENGTH).optional(),
  content: z.any().optional(),
});
