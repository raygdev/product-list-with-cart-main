import './card.css'
const Card = ({ dessert, image, index }) => {
  const images = Object.keys(image).filter((key) => key !== 'thumbnail').reverse()
  console.log(images)
  return (
    <li className='item'>
        <div className="item__container">
            <picture className='item__image'>
                {images.map(src => {
                    if(src === 'mobile') {
                        return <img className='item__image' src={image[src].src} alt={dessert.name} />
                    }

                    return <source media={`(min-width: ${image[src].minWidth})`} srcset={image[src].src} />
                })}
            </picture>
            <div className='item__button-container'>
                <button className='item__button item__button--add-to-cart'>
                    <img aria-hidden='true' src="/assets/images/icon-add-to-cart.svg" alt="" />
                    Add to cart
                </button>
            </div>
            <div className='item__info-container'>
                <p className='item__info-category'>{dessert.category}</p>
                <p className='item__info-title'>{dessert.name}</p>
                <p className='item__info-price'>${dessert.price.toPrecision(3)}</p>
            </div>
        </div>
    </li>
  )
}

export default Card