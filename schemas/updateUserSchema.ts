import * as z from "zod"

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  birth: z.coerce.date().optional(),
  gender: z.string().optional(),
  cpf: z.string().min(8).optional(),
  telephone: z.string().min(10).optional(),
  active: z.boolean().optional()
})

export type User = z.infer<typeof updateUserSchema>