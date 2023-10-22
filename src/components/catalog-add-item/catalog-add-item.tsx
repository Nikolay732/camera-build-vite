import { useAppDispatch } from '../../hooks';
import { useEscKeyDown } from '../../hooks/use-esc-key-down';
import { setActiveModalAddItemStatus } from '../../store/product-data/product-data-slice';
import { ProductItem } from '../../types/product';
import classNames from 'classnames';

type CatalogAddItemProps = {
  product: ProductItem;
  isActiveModalAddItem: boolean;
}

export function CatalogAddItem ({product, isActiveModalAddItem: isActive}: CatalogAddItemProps) {
  const dispatch = useAppDispatch();
  const {name, vendorCode, type, category, level, price, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x} = product;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  const handleButtonAddBasketClick = () => {
    //dispatch(addBusket(product))
  };
  const hanldeButtonCloseClick = () => {
    dispatch(setActiveModalAddItemStatus(false));
  };

  useEscKeyDown(hanldeButtonCloseClick);

  return (
    <div className={classNames('modal', {'is-active': isActive})}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={hanldeButtonCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
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
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${price.toLocaleString('ru')} ₽`}</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonAddBasketClick}>
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={hanldeButtonCloseClick}>
            <svg width={10} height={10}aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
