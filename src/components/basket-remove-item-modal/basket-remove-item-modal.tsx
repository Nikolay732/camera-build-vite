import { Link } from 'react-router-dom';
import { ProductItem } from '../../types/product';
import { BasketItemDescription } from '../basket-item-description/basket-item-description';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { deleteItem, setStatusModalRemoveItem } from '../../store/basket-product-data/basket-product-data-slice';
import { useModal } from '../../hooks/use-esc-key-down';

type BasketRemoveItemModalProps = {
  product: ProductItem;
  isActive: boolean;
}

export function BasketRemoveItemModal ({product, isActive}: BasketRemoveItemModalProps) {
  const dispatch = useAppDispatch();

  const hanldeButtonCloseClick = () => {
    dispatch(setStatusModalRemoveItem(false));
  };

  const handleButtonRemoveItemClick = () => {
    dispatch(deleteItem(product.id));
    dispatch(setStatusModalRemoveItem(false));
  };

  useModal(hanldeButtonCloseClick, isActive);

  return (
    <div className={classNames('modal', {'is-active': isActive})}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={hanldeButtonCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <BasketItemDescription product={product}/>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleButtonRemoveItemClick}>
              Удалить
            </button>
            <Link className="btn btn--transparent modal__btn modal__btn--half-width" to="#" onClick={hanldeButtonCloseClick}>
              Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={hanldeButtonCloseClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

