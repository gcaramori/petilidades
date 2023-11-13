import * as z from 'zod'

export const addUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  birth: z.coerce.date(),
  gender: z.string(),
  cpf: z.string().min(8),
  telephone: z.string().min(10),
  active: z.boolean(),
})

export type User = z.infer<typeof addUserSchema>
