import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { addProductSchema } from '@/schemas/addProductSchema'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req

    if (method === 'POST') {
        try {
            const product = addProductSchema.parse(body)

            const newProduct = await prisma.products.create({
                data: {
                    name: product.name,
                    description: product.description,
                    sku: product.sku,
                    categories: product.categories,
                    visits: product.visits,
                    createdAt: product.createdAt,
                    variants: {
                        create: product.variants
                    }
                }
            })

            res.status(200).json(newProduct)
        }
        catch (error: any) {
            res.status(400).json({ error: error.message || "Erro ao criar produto!" })
        }
    }
    else if (method === 'GET') {
        const products = await prisma.products.findMany({
            include: {
                variants: true
            }
        })

        res.status(200).json(products)
    }
    else if (method === 'PUT') {
        const { id, ...productData } = req.body

        if (!id) {
            res.status(400).json({ error: "Id não informado!" })
        }

        try {
            const updatedUser = await prisma.products.update({
                where: {
                    id
                },
                data: productData
            })

            res.status(200).json(updatedUser)
        }
        catch (error: any) {
            res.status(400).json({ error: error.message || "Erro ao atualizar usuário!" })
        }
    }
    else {
        res.status(500).json({ error: "Rota não encontrada!" })
    }
}
