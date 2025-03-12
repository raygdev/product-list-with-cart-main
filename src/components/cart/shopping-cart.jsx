import { Fragment } from "react";
import { useCart } from "../../hooks/useCart";
import "./shopping-cart.css";

function ShoppingCart() {
  const { cart, removeItem, cartAnnouncement } = useCart();
  const itemCount = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  const orderTotal = cart
    .reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0)
    .toFixed(2);
  return (
    <aside className="cart">
      <div className="cart-container">
        <h2 className="cart-title text-2-bold">
          {itemCount === 0 ? "Your Cart (0)" : `Your Cart (${itemCount})`}
        </h2>
        {itemCount === 0 && (
          <div className="cart-container--empty">
            <p className="text-4-semibold">Your added items will appear hear</p>
          </div>
        )}

        {cart.length > 0 && (
          <>
            <ul role="list">
              {cart.map((item) => (
                <Fragment key={item.id}>
                  <li className="cart-item">
                    <div className="cart-item__wrapper">
                      <h3 className="cart-item__title text-4-semibold">
                        {item.name}
                      </h3>
                      <p className="info">
                        <span className="cart-item__quantity text-4-semibold">
                          {item.quantity}x
                        </span>{" "}
                        {"  "}
                        <span className="cart-item__price text-4-regular">
                          @ ${item.price}
                        </span>
                        {"  "}
                        <span className="cart-item__total text-4-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <button
                      className="cart-item__button"
                      aria-label={`remove all ${item.name}`}
                      onClick={() => removeItem(item.id)}
                    >
                      <img src="/assets/images/icon-remove-item.svg" alt="" />
                    </button>
                  </li>
                  <hr></hr>
                </Fragment>
              ))}
            </ul>
            <div>
              <p>Order Total</p>
              <span>${orderTotal}</span>
            </div>
          </>
        )}
      </div>
      <div aria-live="polite" className="sr-only">
        {cartAnnouncement}
      </div>
    </aside>
  );
}

export default ShoppingCart;
