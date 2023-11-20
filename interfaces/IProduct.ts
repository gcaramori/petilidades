import { IVariant } from "./IVariant"

export interface IProduct {
    id: string
    name: string
    description: string
    variants: IVariant[]
    categories: string[]
    visits: number
    createdAt: number
}