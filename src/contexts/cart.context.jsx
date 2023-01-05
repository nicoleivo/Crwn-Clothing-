import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: ++cartItem.quantity} 
        : cartItem )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? 
        {...cartItem, quantity: --cartItem.quantity} 
        : cartItem )
    }
}

const deleteCartItem = (cartItems, productToDelete) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDelete.id)

    if(existingCartItem) {
        return cartItems.filter(cartItem => cartItem.id !== productToDelete.id)
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, deleteItemFromCart, cartItems, cartCount, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}