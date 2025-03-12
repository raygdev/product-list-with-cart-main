import { createContext, useState } from "react";

const ShoppingCartContext = createContext(null);

export default function ShoppingCartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartAnnouncement, setCartAnnouncement] = useState(
    "No items currently in your cart"
  );

  function calculateCartTotal(acc, item) {
    return acc + item.quantity * item.price;
  }

  function addToCart(item) {
    setCart((oldCart) => {
      const newCart = [...oldCart, item];
      const cartTotal = newCart.reduce(calculateCartTotal, 0).toFixed(2);
      setCartAnnouncement(
        `${item.name} added to cart. Quantity: ${item.quantity}.
                Cart Total: $${cartTotal}`
      );
      return newCart;
    });
  }

  function increaseQuantity(id) {
    setCart((oldCart) => {
      const newCart = oldCart.map((item) => ({ ...item }));
      const item = newCart.find((item) => item.id === id);
      item.quantity += 1;
      const cartTotal = newCart.reduce(calculateCartTotal, 0).toFixed(2);
      setCartAnnouncement(
        `${item.name} added to cart. Quantity: ${item.quantity}.
                Total for ${item.name}: $${(item.quantity * item.price).toFixed(
          2
        )}.
                Cart total: $${cartTotal}`
      );
      return newCart;
    });
  }

  function decreaseQuantity(id) {
    setCart((oldCart) => {
      const newCart = oldCart.map((item) => ({ ...item }));
      const item = newCart.find((item) => item.id === id);

      if (item.quantity - 1 === 0) {
        if (cart.length === 1) {
          setCartAnnouncement(
            `${item.name} removed from cart. no items currently in your cart`
          );
          return [];
        }
        setCartAnnouncement(`${item.name} removed from cart`);
        return newCart.filter((item) => item.id !== id);
      }

      item.quantity -= 1;
      const cartTotal = newCart.reduce(calculateCartTotal, 0).toFixed(2);
      setCartAnnouncement(
        `removed one ${item.name} from cart. Quantity: ${item.quantity}.
                Total for ${item.name}: $${(item.price * item.quantity).toFixed(
          2
        )}.
                Cart total: $${cartTotal}`
      );
      return newCart;
    });
  }

  function removeItem(id) {
    setCart((oldCart) => {
      const item = oldCart.find((item) => item.id === id);
      if (cart.length === 1) {
        setCartAnnouncement(
          `${item.name} removed from cart. No items currently in your cart.`
        );
        return [];
      }
      setCartAnnouncement(`${item.name} removed from cart.`);
      return oldCart.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        cartAnnouncement,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartContext };
