import { useCart } from '../../hooks/useCart'
import './card.css'
const Card = ({ dessert, image, index }) => {
  const images = Object.keys(image).filter((key) => key !== 'thumbnail').reverse()
  const { cart, increaseQuantity, decreaseQuantity, addToCart } = useCart()
  const itemInCart = cart.find(item => item.id === index)
  const quantity = itemInCart?.quantity
  const item = {
    name: dessert.name,
    id: index,
    quantity: 1,
    price: dessert.price.toPrecision(3),
    image: image.thumbnail
  }

  return (
    <li className='item'>
        <div className="item__container">
            <picture className={`item__image ${itemInCart && 'item__image--border'}`}>
                {images.map((src, index) => {
                    if(src === 'mobile') {
                        return <img key={index} className='item__image' src={image[src].src} alt={dessert.name} />
                    }

                    return <source key={index} media={`(min-width: ${image[src].minWidth})`} srcSet={image[src].src} />
                })}
            </picture>
            <div className='item__button-container'>
                { !quantity ? (
                  <button 
                    onClick={() => addToCart(item)} 
                    className='item__button item__button--add-to-cart text-4-semibold'
                  >
                      <img aria-hidden='true' src="/assets/images/icon-add-to-cart.svg" alt="" />
                      Add to cart
                  </button>
                ) : 
                 (
                    <div className='item__button-container--cart-item'>
                      <button 
                        onClick={() => decreaseQuantity(index) }
                        className='decrement'>
                        <img src="/assets/images/icon-decrement-quantity.svg" alt="" />
                      </button>
                      <span className='quantity'>{quantity}</span>
                      <button
                        onClick={() => {
                            increaseQuantity(index)
                        }}
                        className='increment'>
                        <img src="/assets/images/icon-increment-quantity.svg" alt="" />
                      </button>
                    </div>
                 )
                
                }
                
            </div>
            <div className='item__info-container'>
                <p className='item__info-category text-4-regular'>{dessert.category}</p>
                <p className='item__info-title text-3-semibold'>{dessert.name}</p>
                <p className='item__info-price text-3-semibold'>${dessert.price.toPrecision(3)}</p>
            </div>
        </div>
    </li>
  )
}

export default Card