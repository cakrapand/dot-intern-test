import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(6),
  password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
