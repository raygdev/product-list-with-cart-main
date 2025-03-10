import { createContext, useState } from "react";

const ShoppingCartContext = createContext(null)


export default function ShoppingCartProvider ({ children }) {
    const [cart, setCart] = useState([])
    
    function addToCart(item) {
        setCart(oldCart => {
            return [...oldCart, item]
        })
    }

    function increaseQuantity (id) {
        setCart(oldCart => {
            const newCart = oldCart.map(item => ({ ...item }))
            const item = newCart.find(item => item.id === id)
            item.quantity += 1
            return newCart
        })
    }

    function decreaseQuantity (id) {
        setCart(oldCart => {
            const newCart = oldCart.map(item => ({...item}))
            const item = newCart.find(item => item.id === id)

            if((item.quantity - 1) === 0) {
                return newCart.filter(item => item.id !== id)
            }

            item.quantity -= 1
            return newCart
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ addToCart, cart, increaseQuantity, decreaseQuantity }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}


export { ShoppingCartContext }