import { useContext } from "react";
import { ShoppingCartContext } from "../context/cart-provider";

export const useCart = () => {
    const cart = useContext(ShoppingCartContext)

    return cart
}