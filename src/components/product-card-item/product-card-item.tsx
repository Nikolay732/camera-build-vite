import { APIRoute} from '../../const';
import { ProductItem } from '../../types/product';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCurrentProduct, setIsActiveModalAddItem } from '../../store/product-data/product-data-slice';
import { Rating } from '../rating/rating';

type ProductCardItemProps = {
  product: ProductItem;
}
export function ProductCardItem ({product}: ProductCardItemProps) {
  const dispatch = useAppDispatch();
  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = product;
  const sourceSrcSet = `${previewImgWebp}, ${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const handleButtonClick = () => {
    dispatch(setCurrentProduct(product));
    dispatch(setIsActiveModalAddItem(true));
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={sourceSrcSet}/>
          <img src={previewImg} srcSet={imgSrcSet} width={280} height={240} alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={rating}/>
          <p className="visually-hidden">{`Рейтинг: ${rating}`}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${price.toLocaleString('ru')} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleButtonClick}>
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${APIRoute.ProductList}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
