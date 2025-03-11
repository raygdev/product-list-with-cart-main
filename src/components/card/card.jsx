import Picture from "../picture/picture";
import CardButtons from '../buttons/card-buttons'
import { useCart } from "../../hooks/useCart";
import "./card.css";
const Card = ({ dessert, image, index }) => {
  const { cart } = useCart();
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
        <div className="item__info-container">
          <h2 className="item__info-title text-3-semibold">{dessert.name}</h2>
          <p className="item__info-category text-4-regular">
            {dessert.category}
          </p>
          <p className="item__info-price text-3-semibold">
            ${dessert.price.toPrecision(3)}
          </p>
        </div>
        <Picture name={dessert.name} image={image} itemInCart={itemInCart} />
        <CardButtons name={dessert.name} item={item} index={index} quantity={quantity || 0} />
      </div>
    </li>
  );
};

export default Card;
