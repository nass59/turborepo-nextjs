import { z } from 'zod';

const MAX_LENGTH_NAME = 50;

const settingSchema = z.object({
  name: z.string().min(1).max(MAX_LENGTH_NAME),
});

export type SettingsFormData = z.infer<typeof settingSchema>;
