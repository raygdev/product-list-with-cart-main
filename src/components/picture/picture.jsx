import './picture.css'

function Picture({ image, itemInCart, name }) {

  const images = Object.keys(image).filter((key) => key !== 'thumbnail').reverse()

  return (
    <picture className={`item__image `}>
      {images.map((src, index) => {
        if (src === "mobile") {
          return (
            <img
              key={index}
              className={`item__image ${itemInCart && "item__image--border"}`}
              src={image[src].src}
              alt={name}
            />
          );
        }

        return (
          <source
            key={index}
            media={`(min-width: ${image[src].minWidth})`}
            srcSet={image[src].src}
          />
        );
      })}
    </picture>
  );
}

export default Picture;
