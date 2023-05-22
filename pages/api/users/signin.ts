import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method, body } = req;

    if(method === 'POST') {
        const { email, password } = body
        
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(!user) {
            res.status(400).json({ message: "O email não foi encontrado!" })

            return
        }

        if(!compare(password, user.password)) {
            res.status(400).json({ message: "A senha está incorreta!" })

            return
        }

        const accessToken = sign(email, password)

        res.status(200).json({ email, password, accessToken })
    }
}
