import Picture from "../picture/picture";
import { useCart } from "../../hooks/useCart";
import "./card.css";
const Card = ({ dessert, image, index }) => {
  const { cart, increaseQuantity, decreaseQuantity, addToCart } = useCart();
  const itemInCart = cart.find((item) => item.id === index);
  const quantity = itemInCart?.quantity;
  const item = {
    name: dessert.name,
    id: index,
    quantity: 1,
    price: dessert.price.toPrecision(3),
    image: image.thumbnail,
  };

  return (
    <li className="item">
      <div className="item__container">
        <Picture name={dessert.name} image={image} itemInCart={itemInCart} />
        <div className="item__button-container">
          <button
            aria-hidden={!!quantity}
            onClick={() => addToCart(item)}
            className="item__button item__button--add-to-cart text-4-semibold"
          >
            <img
              aria-hidden="true"
              src="/assets/images/icon-add-to-cart.svg"
              alt=""
            />
            Add to cart
          </button>
          <div
            aria-hidden={!quantity}
            className="item__button-container--cart-item"
          >
            <button
              onClick={() => decreaseQuantity(index)}
              className="decrement"
            >
              <img src="/assets/images/icon-decrement-quantity.svg" alt="" />
            </button>
            <span className="quantity">{quantity || 1}</span>
            <button
              onClick={() => {
                increaseQuantity(index);
              }}
              className="increment"
            >
              <img src="/assets/images/icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="item__info-container">
          <p className="item__info-category text-4-regular">
            {dessert.category}
          </p>
          <p className="item__info-title text-3-semibold">{dessert.name}</p>
          <p className="item__info-price text-3-semibold">
            ${dessert.price.toPrecision(3)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Card;
