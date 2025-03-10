import './card.css'
const Card = ({ dessert, image, index }) => {
  const images = Object.keys(image).filter((key) => key !== 'thumbnail').reverse()
  return (
    <li className='item'>
        <div className="item__container">
            <picture className='item__image'>
                {images.map((src, index) => {
                    if(src === 'mobile') {
                        return <img key={index} className='item__image' src={image[src].src} alt={dessert.name} />
                    }

                    return <source key={index} media={`(min-width: ${image[src].minWidth})`} srcSet={image[src].src} />
                })}
            </picture>
            <div className='item__button-container'>
                <button onClick={() => console.log(index)} className='item__button item__button--add-to-cart text-4-semibold'>
                    <img aria-hidden='true' src="/assets/images/icon-add-to-cart.svg" alt="" />
                    Add to cart
                </button>
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