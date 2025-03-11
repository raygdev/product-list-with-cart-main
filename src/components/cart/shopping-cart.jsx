import { useCart } from "../../hooks/useCart";
import './shopping-cart.css'

function ShoppingCart() {
  const { cart } = useCart()
  const itemCount = cart.reduce((acc, item) => {
    return acc + item.quantity
  },0)
  return (
    <aside aria-live="polite" className="cart">
      <div className="cart-container">
        <h2 className="cart-title text-2-bold">{itemCount === 0 ? "Your Cart (0)": `Your Cart (${itemCount})`}</h2>
        {itemCount ===  0 && (
            <div className="cart-container--empty">
                <p className="text-4-semibold">Your added items will appear hear</p>
            </div>
        )}
      </div>
    </aside>
  );
}

export default ShoppingCart
