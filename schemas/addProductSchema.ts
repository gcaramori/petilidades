import * as z from 'zod'

export const addProductSchema = z.object({
    name: z.string(),
    sku: z.string(),
    images: z.object({
        url: z.string()
    }),
    price: z.number(),
    list_price: z.number(),
    boleto_price: z.number(),
    quantity: z.number(),
    categories: z.array(z.string()),
    discount: z.number(),
    extra: z.object({}),
    visits: z.number(),
    createdAt: z.coerce.date()
})

export type Product = z.infer<typeof addProductSchema>
