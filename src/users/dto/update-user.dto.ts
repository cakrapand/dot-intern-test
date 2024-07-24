import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
