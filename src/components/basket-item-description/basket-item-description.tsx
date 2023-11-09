import { Fragment } from 'react';
import { ProductItem } from '../../types/product';

type BasketItemDescriptionProps = {
  product: ProductItem;
  isModal?: boolean;
}

export function BasketItemDescription ({product, isModal}: BasketItemDescriptionProps) {
  const {name, vendorCode, type, category, level, price, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x} = product;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;
  return (
    <Fragment>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={sourceSrcSet}/>
          <img src={imgPreview} srcSet={imgSrcSet} width={140} height={120} alt={name}/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{` ${vendorCode}`}</span>
          </li>
          <li className="basket-item__list-item">{`${type} ${category}`}</li>
          <li className="basket-item__list-item">{`${level} уровень`}</li>
        </ul>
        {
          isModal &&
          <p className="basket-item__price">
            <span className="visually-hidden">
              Цена:
            </span>
            {`${price.toLocaleString('ru')} ₽`}
          </p>
        }
      </div>
      {
        !isModal &&
        <p className="basket-item__price">
          <span className="visually-hidden">
            Цена:
          </span>
          {`${price.toLocaleString('ru')} ₽`}
        </p>
      }
    </Fragment>
  );
}
