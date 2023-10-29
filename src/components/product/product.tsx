import { ProductItem } from '../../types/product';
import { ProductTabs } from '../poduct-tabs/poduct-tabs';
import { RATINGS } from '../../const';
import { RatingItem } from '../rating-item/rating-item';

type ProductProps = {
  product: ProductItem;
}

export function Product ({product}:ProductProps) {
  const {name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={sourceSrcSet}/>
            <img src={imgPreview} srcSet={imgSrcSet} width={560} height={480} alt={name}/>
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>
          <div className="rate product__rate">
            {RATINGS.map((item) => <RatingItem key={item} item={item} rating={rating}/>)}
            <p className="visually-hidden">{`Рейтинг: ${rating}`}</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
          </div>
          <p className="product__price"><span className="visually-hidden">Цена:</span>{`${price.toLocaleString('ru')} ₽`}</p>
          <button className="btn btn--purple" type="button">
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
          <ProductTabs product={product}/>
        </div>
      </div>
    </section>
  );
}
