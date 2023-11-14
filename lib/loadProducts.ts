export const loadProducts = async () => {
    const products = await fetch('https://dummyjson.com/products')
        .then(res => res.json())

    return products
}