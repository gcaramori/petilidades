import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { addUserSchema } from '@/schemas/addUserSchema';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method, body } = req;

    if(method === 'POST') {
        try {
            const user = addUserSchema.parse(body);

            user.password = await hash(user.password, 10);

            const newUser = await prisma.user.create({  
                data: user
            })
    
            res.status(200).json(newUser)
        }
        catch(error: any) {
            res.status(400).json({ error: error.message || "Error trying to create a new user!" })
        }
    }
    else if(method === 'GET') {
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    }
}
