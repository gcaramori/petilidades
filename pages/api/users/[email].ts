import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'
import { updateUserSchema } from '@/schemas/updateUserSchema';

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body, query } = req;

    if(method === 'PUT') {
      try {
        const { email } = query;

        const validatedData = updateUserSchema.parse(body)

        const updatedUser = await prisma.user.update({
            where: { email },
            data: validatedData
        })

        res.status(200).json({ updatedUser })
      }
      catch(error: any) {
        res.status(400).json({ error: error.message || "Erro ao ativar usuário!" })
      }
    }
    else if(method === 'GET') {
      const { email } = query;

      const user = await prisma.user.findUnique({
        where: { email }
      })

      res.status(200).json({ user })
    }
}