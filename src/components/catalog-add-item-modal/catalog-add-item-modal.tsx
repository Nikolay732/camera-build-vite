import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks';
import { useModal } from '../../hooks/use-esc-key-down';
import { setActiveModalAddItemStatus } from '../../store/product-list-data/product-list-data-slice';
import { ProductItem } from '../../types/product';
import classNames from 'classnames';
import { BasketProductData } from '../basket-product-data/basket-product-data';
import { ButtonAddToBasket } from '../button-add-to-basket/button-add-to-basket';

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
              <BasketProductData product={product}/>
            </div>
            <div className="modal__buttons">
              <ButtonAddToBasket product={product} isModal/>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={hanldeButtonCloseClick}
            >
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
