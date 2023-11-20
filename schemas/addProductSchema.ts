import * as z from 'zod'

export const addProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    categories: z.array(z.string()),
    variants: z.array(z.object({
        attributes: z.object({}),
        images: z.array(z.string()),
        price: z.number(),
        list_price: z.number(), 
        boleto_price: z.number(),
        quantity: z.number(),
        discount: z.number()
    })),
    visits: z.number(),
    createdAt: z.coerce.date()
})

export type Product = z.infer<typeof addProductSchema>
