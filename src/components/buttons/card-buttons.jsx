import { useCart } from "../../hooks/useCart";

function CardButtons ({ quantity, item, name, index }) {
    const { increaseQuantity, decreaseQuantity, addToCart } = useCart()
    const text  =`${name}${ quantity === 1 ? "" : "s"} in  your cart`
    
    return (
        <div className="item__button-container">
          <button
            aria-hidden={quantity > 0}
            onClick={() => addToCart(item)}
            className="item__button item__button--add-to-cart text-4-semibold"
          >
            <img
              src="/assets/images/icon-add-to-cart.svg"
              alt={name}
            />
            Add to cart
          </button>
          <div
            role='region'
            aria-live="polite"
            aria-atomic='false'
            aria-hidden={quantity < 1}
            className="item__button-container--cart-item"
          >
            <button
              aria-label={`remove one ${name}`}
              onClick={() => decreaseQuantity(index)}
              className="decrement"
            >
              <img src="/assets/images/icon-decrement-quantity.svg" alt="" />
            </button>
            <span aria-relevant="additions" className="quantity">{quantity || 1} 
                <span className="sr-only">{" "}{text}</span>
            </span>
            <button
              aria-label={`add one ${name}`}
              onClick={() => {
                increaseQuantity(index);
              }}
              className="increment"
            >
              <img src="/assets/images/icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        </div>
    )
}

export default CardButtons