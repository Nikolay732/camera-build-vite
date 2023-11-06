import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks';
import { useModal } from '../../hooks/use-esc-key-down';
import { setActiveModalAddItemStatus } from '../../store/product-list-data/product-list-data-slice';
import { ProductItem } from '../../types/product';
import classNames from 'classnames';
import { BasketItemProduct } from '../basket-item-product/basket-item-product';

type CatalogAddItemModalProps = {
  product: ProductItem;
  isActive: boolean;
}

export function CatalogAddItemModal ({product, isActive}: CatalogAddItemModalProps) {
  const dispatch = useAppDispatch();

  const hanldeButtonCloseClick = () => {
    dispatch(setActiveModalAddItemStatus(false));
  };

  useModal(hanldeButtonCloseClick, isActive);

  return (
    <ReactFocusLock>
      <div className={classNames('modal', {'is-active': isActive})}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={hanldeButtonCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <BasketItemProduct product={product}/>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
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
    </ReactFocusLock>
  );
}
