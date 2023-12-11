import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBasketProductList, getCamerasIds, getBonus, getPayable, getTotalPrice, getStatusPostOrder, getErrorStatus, getStatusValidPromoCode, getPromoCode } from '../../store/basket-product-data/basket-product-data-selectors';
import { Status } from '../../const';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Coupon } from '../../types/coupon';
import { postCouponAction, postOrderAction } from '../../store/basket-product-data/basket-product-data-thunk';
import { resetBasket, setPromoCode} from '../../store/basket-product-data/basket-product-data-slice';

export function BasketSummary () {
  const dispatch = useAppDispatch();
  const basketProductList = useAppSelector(getBasketProductList);
  const totalPrice = useAppSelector(getTotalPrice);
  const productIds = useAppSelector(getCamerasIds);
  const bonus = useAppSelector(getBonus);
  const payable = useAppSelector(getPayable);
  const promoCode = useAppSelector(getPromoCode);
  const postOrderStatus = useAppSelector(getStatusPostOrder);
  const isError = useAppSelector(getErrorStatus);
  const isValidPromoCode = useAppSelector(getStatusValidPromoCode);
  const [promoText, setPromoText] = useState<Coupon | null>(promoCode);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    setPromoText(value as Coupon);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (promoText && promoText.length > 0) {
      dispatch(postCouponAction(promoText));
      dispatch(setPromoCode(promoText));
    }
  };

  const handleButtonClick = () => {
    dispatch(postOrderAction({camerasIds: productIds, coupon: promoCode}));
  };

  useEffect(() => {
    if (postOrderStatus === Status.Success) {
      dispatch(resetBasket());
    }
  }, [dispatch, postOrderStatus]);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#" onSubmit={handleFormSubmit}>
            <div className={classNames('custom-input', {'is-invalid': isError}, {'is-valid': isValidPromoCode || bonus > 0})}>
              <label>
                <span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод"
                  onChange={handleInputChange}
                  defaultValue={promoText || ''}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{`${totalPrice.toLocaleString('ru')} ₽`}</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={classNames('basket__summary-value', {'basket__summary-value--bonus': bonus > 0})}>
            {`${bonus.toLocaleString('ru')} ₽`}
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">{`${payable.toLocaleString('ru')} ₽`}</span>
        </p>
        <button className="btn btn--purple" type="submit"
          onClick={handleButtonClick}
          disabled={!basketProductList.length || postOrderStatus === Status.Loading}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
