import { IProduct } from "@/interfaces/IProduct"

export const loadProductsForSlider = async () => {
    const productsResponse = await fetch(`${process.env.API_URL}/products`)
        .then(res => res.json())
    
    console.log('products response: ', productsResponse);
        
    const products = productsResponse.map((product: IProduct) => {
        return {
            ...product,
            images: product.variants[0].images,
            url: `https://google.com`,
            price: product.variants[0].price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
            list_price: product.variants[0].list_price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
            boleto_price: product.variants[0].boleto_price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
        }
    })

    return products
}