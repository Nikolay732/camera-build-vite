import { RATINGS } from '../../const';
import { ProductItem } from '../../types/product';
import { Link } from 'react-router-dom';
import { RatingItem } from '../rating-item/rating-item';

type ProductCardItemProps = {
  product: ProductItem;
}
export function ProductCardItem ({product}: ProductCardItemProps) {
  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = product;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}/>
          <img src={previewImg} srcSet={previewImg2x} width={280} height={240} alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {RATINGS.map((item) => <RatingItem key={item} item={item} rating={rating}/>)}
          <p className="visually-hidden">{`Рейтинг: ${rating}`}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${price.toLocaleString('ru')} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}
