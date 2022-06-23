import { useState, useEffect, createContext } from 'react';

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
    open: false,
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}