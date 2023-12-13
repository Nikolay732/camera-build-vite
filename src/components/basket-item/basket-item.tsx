import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { CountProductBasket, KeyCode } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCountItem, setDeletedProduct, setNextCountItem, setPrevCountItem, setStatusModalRemoveItem } from '../../store/basket-product-data/basket-product-data-slice';
import { BasketProduct} from '../../types/product';
import { BasketItemDescription } from '../basket-item-description/basket-item-description';

type BasketItemProps = {
  basketProduct: BasketProduct;
}

export function BasketItem ({basketProduct}: BasketItemProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement | null>(null);
  const {count, product} = basketProduct;

  const handleButtonPrevClick = () => {
    dispatch(setPrevCountItem(product.id));
  };

  const handleButtonNextClick = () => {
    dispatch(setNextCountItem(product.id));
  };

  const hanldeInputValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;

    if (Number(value) > CountProductBasket.MAX) {
      dispatch(setCountItem({id: product.id, count: CountProductBasket.MAX}));
      return;
    }
    dispatch(setCountItem({id: product.id, count: Math.ceil(Number(value))}));
  };

  const hanldeInputValueBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    const validValue = Number(value);

    if (Number(value) < CountProductBasket.MIN) {
      dispatch(setCountItem({id: product.id, count: CountProductBasket.MIN}));
    }
    evt.target.value = validValue.toString();
  };

  const hanldeEnterClick = (evt: KeyboardEvent<HTMLInputElement>) => {
    const {target} = evt;
    if (evt.key === KeyCode.Enter && target instanceof HTMLInputElement && ref.current) {
      ref.current.blur();
    }
  };

  const handleButtonRemoveItem = () => {
    dispatch(setDeletedProduct(product));
    dispatch(setStatusModalRemoveItem(true));
  };

  return (
    <li className="basket-item">
      <BasketItemDescription product={product} isBasketItem/>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={count <= CountProductBasket.MIN}
          onClick={handleButtonPrevClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter${product.id.toString()}`}></label>
        <input
          type="number"
          id={`counter${product.id.toString()}`}
          min="1"
          max="99"
          aria-label="количество товара"
          ref={ref}
          onChange={hanldeInputValueChange}
          onBlur={hanldeInputValueBlur}
          value={count || ''}
          onKeyDown={hanldeEnterClick}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={count === CountProductBasket.MAX}
          onClick={handleButtonNextClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {`${(product.price * count).toLocaleString('ru')} ₽`}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleButtonRemoveItem}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
