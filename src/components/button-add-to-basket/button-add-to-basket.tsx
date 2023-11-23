import { useAppDispatch } from '../../hooks';
import { addProductToBasket } from '../../store/basket-product-data/basket-product-data-slice';
import { setActiveModalAddItemStatus, setActiveModalAddItemSuccessStatus } from '../../store/catalog-process/catalog-process-slice';
import { ProductItem } from '../../types/product';
import classNames from 'classnames';

type ButtonAddToBasketProps = {
  product: ProductItem;
  isModal?: boolean;
}

export function ButtonAddToBasket ({product, isModal}: ButtonAddToBasketProps) {
  const dispatch = useAppDispatch();

  const handleButtonAddToBasketClick = () => {
    dispatch(addProductToBasket(product));
    if(isModal) {
      dispatch(setActiveModalAddItemStatus(false));
      dispatch(setActiveModalAddItemSuccessStatus(true));
    }
  };

  return (
    <button
      className={classNames('btn', 'btn--purple', {'modal__btn modal__btn--fit-width': isModal})}
      type="button"
      onClick={handleButtonAddToBasketClick}
      data-testid={'btn-add-basket'}
    >
      <svg width={24} height={16} aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>
  );
}
