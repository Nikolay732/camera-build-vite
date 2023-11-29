import { AppRoute, RATINGS } from '../../const';
import { ProductItem } from '../../types/product';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import classNames from 'classnames';
import { RatingItem } from '../rating-item/rating-item';
import './product-card-item.css';
import { setActiveModalAddItemStatus, setSelectedProduct } from '../../store/catalog-process/catalog-process-slice';
import { getBasketProductList } from '../../store/basket-product-data/basket-product-data-selectors';

type ProductCardItemProps = {
  product: ProductItem;
  isSimilarProduct?: boolean;
}
export function ProductCardItem ({product, isSimilarProduct}: ProductCardItemProps) {
  const dispatch = useAppDispatch();
  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = product;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;
  const basketProductList = useAppSelector(getBasketProductList);

  const isProductInBasket = basketProductList.find((item) => item.product.id === id);

  const handleButtonClick = () => {
    dispatch(setSelectedProduct(product));
    dispatch(setActiveModalAddItemStatus(true));
  };

  return (
    <div className={classNames('product-card', {'is-active': isSimilarProduct})}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={sourceSrcSet}/>
          <img src={imgPreview} srcSet={imgSrcSet} width={280} height={240} alt={name}/>
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
        {isProductInBasket
          ?
          <Link className='btn btn--purple-border product-card__btn product-card__btn--in-cart' to={`${AppRoute.Basket}`}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </Link>
          :
          <button className="btn btn--purple product-card__btn" type="button" onClick={handleButtonClick}>
            Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
