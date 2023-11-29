import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks';
import { useModal } from '../../hooks/use-esc-key-down';
import { ProductItem } from '../../types/product';
import classNames from 'classnames';
import { BasketItemDescription } from '../basket-item-description/basket-item-description';
import { setActiveModalAddItemStatus, setActiveModalAddItemSuccessStatus } from '../../store/catalog-process/catalog-process-slice';
import { addProductToBasket } from '../../store/basket-product-data/basket-product-data-slice';

type CatalogAddItemModalProps = {
  product: ProductItem;
  isActive: boolean;
}

export function CatalogAddItemModal ({product, isActive}: CatalogAddItemModalProps) {
  const dispatch = useAppDispatch();

  const hanldeButtonCloseClick = () => {
    dispatch(setActiveModalAddItemStatus(false));
  };

  const handleButtonAddToBasketClick = () => {
    dispatch(addProductToBasket(product));
    dispatch(setActiveModalAddItemStatus(false));
    dispatch(setActiveModalAddItemSuccessStatus(true));
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
              <BasketItemDescription product={product} isModal/>
            </div>
            <div className="modal__buttons">
              <button
                className='btn btn--purple modal__btn modal__btn--fit-width'
                type="button"
                onClick={handleButtonAddToBasketClick}
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>
                Добавить в корзину
              </button>
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
