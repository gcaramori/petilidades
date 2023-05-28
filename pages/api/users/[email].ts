import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'
import { updateUserSchema } from '@/schemas/updateUserSchema';

type UserWhereUniqueInput = Prisma.UserWhereUniqueInput

const prisma = new PrismaClient()

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body, query } = req;

    if(method === 'PUT') {
      try {
        const { email }: UserWhereUniqueInput = query;

        const validatedData = updateUserSchema.parse(body)

        const updatedUser = await prisma.user.update({
            where: { email },
            data: validatedData
        })

        res.status(200).json({ updatedUser })
      }
      catch(error: any) {
        res.status(400).json({ error: error.message || "Error trying to update a new user!" })
      }
    }
    else if(method === 'GET') {
      const { email }: UserWhereUniqueInput = query;

      const user = await prisma.user.findUnique({
        where: { email }
      })

      res.status(200).json({ user })
    }
}